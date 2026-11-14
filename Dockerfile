# syntax=docker/dockerfile:1

# Build:
#   docker build -t playwright-tests:latest .
# Run:
#   docker run --init --ipc=host --rm playwright-tests:latest
#   docker run --init --ipc=host --rm -e CI=true playwright-tests:latest npx playwright test tests/e2e
#
# --init and --ipc=host are required; see readme.md ("Docker") for details.

# The official Playwright image bundles the browsers and OS dependencies for
# exactly one Playwright release. The tag MUST match @playwright/test in
# package.json / package-lock.json, otherwise Playwright looks for a browser
# build that does not exist in the image. Bump both together.
ARG PW_VERSION=1.62.1
FROM mcr.microsoft.com/playwright:v${PW_VERSION}-noble

ARG PW_VERSION

# noble = Ubuntu 24.04; Node.js, npm and all browsers are already installed.
# HOME is pointed at pwuser's home so npm/Playwright caches are not written as root.
ENV HOME=/home/pwuser \
    DEBIAN_FRONTEND=noninteractive \
    npm_config_update_notifier=false \
    npm_config_audit=false \
    npm_config_fund=false

WORKDIR /app

# Create the non-root user (idempotent: the base image already ships pwuser)
# and make sure the work directory is owned by it. Running as non-root keeps
# Chromium's setuid sandbox enabled; as root Chromium disables it with
# "Running as root without --no-sandbox is not supported".
RUN id -u pwuser >/dev/null 2>&1 || useradd --create-home --shell /bin/bash pwuser \
    && mkdir -p /app \
    && chown -R pwuser:pwuser /app

# --- dependency layer -------------------------------------------------------
# Copy only the manifests first so `npm ci` is cached until dependencies change.
COPY --chown=pwuser:pwuser package.json package-lock.json ./

USER pwuser

# Fail fast if the image tag and the pinned @playwright/test version drift apart.
RUN node -e "const p=require('./package-lock.json').packages['node_modules/@playwright/test'];const v=p&&p.version;if(v!==process.env.PW_VERSION){console.error('Version mismatch: image v'+process.env.PW_VERSION+' vs @playwright/test '+v+'. Pin both to the same version.');process.exit(1)}"

# `npm ci` installs exactly what the lockfile pins. Playwright is a
# devDependency and is needed at runtime, so dev dependencies must NOT be omitted.
RUN npm ci

# --- test code layer --------------------------------------------------------
# .dockerignore keeps node_modules, reports, .git and local secrets out of the
# context; otherwise this COPY would clobber the node_modules installed above.
COPY --chown=pwuser:pwuser . .

# Override with e.g.: docker run ... npx playwright test tests/e2e --project=chromium
CMD ["npx", "playwright", "test"]

#-------------------------------------------------------------------------------------------------------------
# Copyright (c) Microsoft Corporation. All rights reserved.
# Licensed under the MIT License. See https://go.microsoft.com/fwlink/?linkid=2090316 for license information.
#-------------------------------------------------------------------------------------------------------------

FROM debian:bookworm-slim

ENV LANG="C.UTF-8"
ARG DEBIAN_FRONTEND="noninteractive"

# Merging the mutiple layers to reduce the size of the image slightly
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        unzip \
        zip \
        jq \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get autoremove -y \
    && apt-get clean -y

# Default to bash shell
ENV SHELL=/bin/bash \
    DOCKER_BUILDKIT=1

# Increase memory allocation to NodeJS
ENV NODE_OPTIONS="--max-old-space-size=8192"
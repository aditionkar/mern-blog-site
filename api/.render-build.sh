#!/usr/bin/env bash

# Remove the node_modules directory to avoid conflicts
rm -rf node_modules

# Install dependencies again
npm install

# Build the project (optional, if you have a build step)
npm run build

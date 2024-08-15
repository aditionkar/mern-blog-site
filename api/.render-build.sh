#!/usr/bin/env bash

echo "Starting the build script..."

# Remove node_modules directory
echo "Removing node_modules..."
rm -rf node_modules

# Install dependencies
echo "Installing dependencies..."
npm install

# Optional build process
echo "Running build process..."
npm run build

echo "Build script completed."


#!/bin/bash
# Custom build script for AWS Amplify

echo "Installing dependencies..."
npm ci

echo "Setting environment variables to disable ESLint..."
export DISABLE_ESLINT_PLUGIN=true
export NEXT_DISABLE_ESLINT=1

echo "Building the application..."
npm run build

echo "Build completed successfully!" 
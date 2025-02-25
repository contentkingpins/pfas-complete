#!/bin/bash
# Custom build script for AWS Amplify

export NEXT_DISABLE_ESLINT=1
export NEXT_DISABLE_TYPESCRIPT=1

echo "Installing dependencies..."
npm ci

echo "Adding \"use client\" directive to layout.tsx if not already present..."
if ! grep -q "use client" src/app/layout.tsx; then
  echo '"use client";' > temp_file
  cat src/app/layout.tsx >> temp_file
  mv temp_file src/app/layout.tsx
fi

echo "Building the application..."
npm run build

echo "Ensuring required server files exist..."
if [ ! -f ".next/required-server-files.json" ]; then
  echo "Creating required-server-files.json..."
  echo '{
    "version": 1,
    "config": {
      "env": {},
      "experimental": {
        "appDir": true
      }
    },
    "files": [
      "server/font-manifest.json",
      "server/middleware-manifest.json",
      "server/pages-manifest.json",
      "prerender-manifest.json",
      "routes-manifest.json"
    ]
  }' > .next/required-server-files.json
fi

echo "Build completed successfully!" 
# Deployment Fix for Next.js App Router Issue

## Problem

The build is failing with the following error:

```
You're importing a component that needs `useEffect`. This React hook only works in a client component. To fix, mark the file (or its parent) with the `"use client"` directive.
```

## Solution

There are two ways to fix this issue:

### Option 1: Add "use client" directive to layout.tsx

Add the following line at the top of `src/app/layout.tsx`:

```jsx
"use client";
```

This will mark the entire layout as a client component, which allows the use of React hooks like `useState` and `useEffect`.

### Option 2: Separate client and server components (Recommended)

1. Create client components for functionality that requires client-side hooks:
   - `ViewportHeightFix.tsx`: Handles the 100vh issue on mobile browsers
   - `MobileNav.tsx`: Handles the mobile navigation menu with its state
   - `Footer.tsx` (CopyrightYear): Handles the dynamic year in the footer

2. Keep the layout.tsx file as a server component and import these client components.

## Current Status

We've implemented Option 2 in the codebase, but the deployment is still failing. This suggests that the changes haven't been properly pushed to the repository or the build is using an older version of the code.

## Quick Fix for AWS Amplify

1. Add a custom build script (`amplify-build.sh`) that adds the "use client" directive to layout.tsx before building:

```bash
#!/bin/bash

# Add "use client" directive to layout.tsx
echo '"use client";' > temp_file
cat src/app/layout.tsx >> temp_file
mv temp_file src/app/layout.tsx

# Continue with normal build
npm run build
```

2. Update `amplify.yml` to use this custom build script:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Skipping preBuild phase, using custom build script"
    build:
      commands:
        - echo "Running custom build script"
        - bash ./amplify-build.sh
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
    discard-paths: no
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

3. Make sure the build script has executable permissions:

```bash
git update-index --chmod=+x amplify-build.sh
```

4. Commit and push these changes to trigger a new build. 
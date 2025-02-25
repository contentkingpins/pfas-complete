# PFAS Claim Website

This is a website for users to check if they have been exposed to PFAS (Per- and polyfluoroalkyl substances) and potentially file a claim for compensation.

## Features

- **AWS Geolocation**: Real-time detection of user's location to determine if they are in a PFAS-contaminated zone
- **Dynamic UI**: Content adapts based on user's location and inputs
- **Interactive Claim Form**: Multi-step form with conditional logic
- **Secure Authentication**: AWS Amplify integration for secure handling of user data

## Getting Started

### Prerequisites

- Node.js 18.x or later
- AWS Account with Location Service enabled
- AWS Access Key and Secret Access Key with appropriate permissions

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
   AWS_LOCATION_INDEX_NAME=PFASContaminationIndex
   ```
4. Replace the placeholder values with your actual AWS credentials

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Production Build

```bash
npm run build
npm run start
```

## AWS Location Service Setup

1. Create a Place Index in AWS Location Service
2. Name it "PFASContaminationIndex" or update the environment variable to match your index name
3. Configure the index with appropriate data sources for PFAS contamination zones

## Project Structure

- `/src/app`: Main application code
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and AWS service integrations
- `/src/types`: TypeScript type definitions
- `/public`: Static assets

## Security Considerations

- Never commit `.env.local` or any files containing AWS credentials
- Use AWS IAM roles with least privilege principle
- Implement proper error handling for AWS service calls

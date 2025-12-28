#!/bin/bash

# Initialize a new artifact project
# Usage: bash scripts/init-artifact.sh <project-name>

PROJECT_NAME=${1:-"my-project"}

echo "Initializing artifact: $PROJECT_NAME"

# Create project structure
mkdir -p src/app
mkdir -p src/components
mkdir -p src/lib
mkdir -p public

echo "Project structure created for $PROJECT_NAME"
echo "Run 'npm install' to install dependencies"
echo "Run 'npm run dev' to start the development server"

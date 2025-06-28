#!/bin/bash

# Build the React app
echo "Building React app..."
npm run build

# Copy .htaccess to build directory (in case it gets overwritten)
echo "Copying .htaccess to build directory..."
cp public/.htaccess build/.htaccess

echo "Build complete! Deploy the contents of the 'build' directory to your server."
echo "Make sure your server's document root points to the build directory." 
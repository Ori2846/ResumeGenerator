# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Install necessary packages
RUN apk add --no-cache \
    texlive-full \
    ghostscript

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]

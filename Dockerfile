# Use a Node.js image with version 18.12 or higher
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml)
COPY package*.json ./

COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate

# RUN npx prisma migrate deploy

# Build the NestJS application
RUN pnpm run build

# Expose the application port
EXPOSE ${APP_PORT}

# Start the application
CMD ["pnpm", "run", "start:prod"]

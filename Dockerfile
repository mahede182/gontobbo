# Use Node.js version matching .node-version
FROM node:20.13.1-alpine

# Set working directory
WORKDIR /app

# Install dependencies required for React Native
RUN apk add --no-cache \
    git \
    bash \
    curl

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose ports
# 8081 - Metro bundler
# 19000 - Expo DevTools
# 19001 - Expo DevTools (secure)
# 19002 - Expo DevTools (ng serve)
EXPOSE 8081 19000 19001 19002

# Default command to start the development server
CMD ["yarn", "start"]

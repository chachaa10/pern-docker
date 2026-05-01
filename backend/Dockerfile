FROM node:20-alpine

WORKDIR /app

# Harden npm for unreliable networks
COPY package*.json ./
RUN npm config set fetch-retries 5 && \
    npm config set fetch-timeout 60000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci --include=dev

COPY . .
RUN npm run build
RUN npm prune --production

EXPOSE 3000
CMD ["node", "dist/index.js"]

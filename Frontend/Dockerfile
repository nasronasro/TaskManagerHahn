# /Frontend/Dockerfile
FROM node:22-alpine

WORKDIR /app

# Cache dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the files
COPY . .

# Expose Vite default port
EXPOSE 5173

# Run Vite with host flag for Docker access
CMD ["npm", "run", "dev", "--", "--host"]
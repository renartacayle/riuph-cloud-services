FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy all source files
COPY . .

# Build both ATS and Checker frontends
RUN npm run build

# Expose port (Hugging Face Spaces uses port 7860 by default)
EXPOSE 7860
ENV PORT=7860
ENV NODE_ENV=production

# Start master reverse proxy server
CMD ["npm", "start"]

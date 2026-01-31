# Use nginx alpine as base image
FROM nginx:alpine

# Install curl for health check (optional)
RUN apk add --no-cache curl

# Create directory for our application
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy our HTML, CSS, and JS files
COPY index.html .
COPY style.css .
COPY script.js .

# Copy custom nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check to ensure nginx is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

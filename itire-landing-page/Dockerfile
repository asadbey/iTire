FROM node:18-alpine AS builder

WORKDIR /app

# copy package manifest(s) first for better caching
COPY package.json ./
COPY package-lock.json* ./

# install dependencies (falls back to npm install if no lockfile)
RUN npm ci --prefer-offline --no-audit --no-fund || npm install

# copy source and build
COPY . .
RUN npm run build

FROM nginx:alpine

# remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# copy built site from builder
COPY --from=builder /app/build /usr/share/nginx/html

# custom nginx config to support SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

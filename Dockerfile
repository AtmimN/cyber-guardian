# Stage 1: Build React App dengan Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Menyalin file konfigurasi package
COPY package*.json ./

# Menginstal dependensi
RUN npm ci

# Menyalin seluruh kode sumber (kecuali yang ada di .dockerignore)
COPY . .

# Melakukan build produksi
RUN npm run build

# Stage 2: Serve website menggunakan web server ringan (Nginx)
FROM nginx:alpine

# Menyalin hasil build dari Stage 1 ke folder HTML Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Mengonfigurasi Nginx agar mendukung routing React SPA (Single Page Application)
RUN rm /etc/nginx/conf.d/default.conf
RUN echo "server { listen 8080; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

# Port 8080 disyaratkan oleh Cloud Run secara default
EXPOSE 8080

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

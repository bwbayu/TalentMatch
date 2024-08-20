# Stage 1: Build React app
FROM node:20.10.0 as build

WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /client/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]


FROM node:24-alpine 

WORKDIR /dashboard

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# --- Production Stage ---
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Copy the built files from the 'builder' stage to the default Nginx public HTML directory
# Note: '/app/build' is for Create React App. For Vue or Vite, it might be '/app/dist'.
COPY --from=builder /app/build /usr/share/nginx/html

# Tell Docker that the container listens on port 80
EXPOSE 80

# The default Nginx command will start the server, so you don't need a CMD here.
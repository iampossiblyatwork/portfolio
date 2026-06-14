# Static portfolio served by nginx.
# Used for container-based hosts; Render static sites don't need this.
FROM nginx:1.27-alpine

# Copy the site into nginx's web root
COPY index.html resume.html styles.css app.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
HEALTHCHECK CMD wget -q --spider http://localhost/ || exit 1
CMD ["nginx", "-g", "daemon off;"]

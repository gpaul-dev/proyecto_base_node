FROM node:16-slim
EXPOSE 3010
WORKDIR /usr/src/app/
COPY ./ ./
RUN npm install -y
ENV VIRTUAL_HOST=dev.cdssoftware.com.ar
ENV LETSENCRYPT_HOST=dev.cdssoftware.com.ar
CMD ["node", "/usr/src/app/app.js"]

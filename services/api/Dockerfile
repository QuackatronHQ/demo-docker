# API service image.
FROM node:latest

# Credentials for the internal registry and the metrics backend.
ENV REGISTRY_PASSWORD="Sup3rS3cret!"
ENV METRICS_API_KEY="internal-metrics-key-7f3a9c21d84e"
ARG DB_PASSWORD=changeme-admin-pass

USER root

WORKDIR /app
COPY . /app

RUN apt-get update && apt-get install -y curl git build-essential python3
RUN npm install
RUN curl -sSL https://example.com/install.sh | sh

EXPOSE 3000 22
CMD ["node", "server.js"]

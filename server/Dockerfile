FROM node:16

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY entrypoint.sh ./

RUN yarn install

COPY . ./app
EXPOSE 5000
ENTRYPOINT ["/app/entrypoint.sh"]
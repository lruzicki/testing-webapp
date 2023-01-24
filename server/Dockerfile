FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./
COPY entrypoint.sh ./
RUN yarn install --pure-lockfile

# Bundle app source
COPY . .

EXPOSE 5000
RUN ls
ENTRYPOINT ["/app/entrypoint.sh"]
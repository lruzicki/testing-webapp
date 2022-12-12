FROM node

#Setup working directory
RUN mkdir -p /testing-webapp
WORKDIR /testing-webapp

#Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

#Copy source files
COPY . .

#Running the app
CMD ["yarn","dev"]
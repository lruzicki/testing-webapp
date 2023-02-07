# testing-webapp
Frontend web application for the GovStack test platform.

## Documentation

## Prerequisites

 * Node.js (Version 16 or greater)
 * Yarn

## Application configuration for development 

To configure and run the application, navigate to project directory and run the following commands:

 * yarn install
 * yarn dev

 This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The application will run on localhost port 3003 by default.

## Build

To run build:

* yarn build

## Tests

To run tests:

* yarn test

## Lint

To run eslint:

* yarn lint

## Docker

Application can be deployed in docker container by running
```shell
docker-compose up --build 
```
or 
```shell
 docker-compose up
```

## Less

Less (which stands for Leaner Style Sheets) is a backwards-compatible language extension for CSS.
Every `.less` file should be localized in the `styles` folder.

To run less-watch-compiler in terminal:
```
yarn less
```

## Backend 
Testing application has a simple backend written using express.js. 
A more detailed description of the backend's part can be found in `/server/README.md`. 

### Setup 
From the main directory (requires running mongoDB):
```bash 
# Go to the directory 
cd server/
# Use default environmental variables, which can be adjusted if necessary
mv .env.example .env 
yarn install
yarn dev
```

Backend service and monogoDB are also setups automatically 
during `docker-compose up --build` execution. 
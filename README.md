# testing-webapp

Frontend web application for the GovStack test platform.

## Documentation

### Prerequisites

- Node.js (Version 16 or greater)
- Npm

### Application configuration for development

To configure and run the application, navigate to project directory and run the following commands:

```
yarn install
yarn dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The application will run on localhost port 3003 by default.

### Build

To run build:

```
yarn build
```

### Tests

To run tests:

```
yarn test
```

### Lint

To run eslint:

```
yarn lint
```

### Docker

Application can be deployed in docker container by running

```shell
docker-compose up --build
```

or

```shell
 docker-compose up
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

## Useful information

Below you will find all the guidelines.

### Translations rules

To ensure that the file with translation keys is properly organized, it is worth familiarizing yourself with its rules:

- JSON keys contain complete translation ID as string. The translation IDs use "." to structure the translations hierarchically

- keys should be added alphabetically

- use a `app.` prefix to store translations that are likely to be used throughout the application

- use `my_component.` prefix to store translations that are likely to be used only in this specific component

  example: `"my_component.custom_key"`

- develop a suitable naming scheme: snake_case

  example:
  `"app.page_not_found"`

- avoid duplication of translation keys

- remove unused translation keys

- avoid concatenating translations

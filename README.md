## Documentation

[Nest](https://github.com/nestjs/nest) framework Typescript basic app.

Before installation:

## Installation

```bash
- brew install node
- brew tap mongodb/brew
- brew install mongodb-community
- npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### POST Requests

- post an entity
  `curl -X 'POST' \ 'http://localhost:3000/mongodb' \ -H 'accept: */*' \ -H 'Content-Type: application/json' \ -d '{"id": 101, "name": "go to shopping", "status": false, "date": "2022-01-10"}'`

### GET Requests

- get all entities
  `curl -X 'GET' \ 'http://localhost:3000/mongodb' \ -H 'accept: */*'`

- get single entity
  `curl -X 'GET' \ 'http://localhost:3000/mongodb/{id}' \ -H 'accept: */*'`

Note: the rest of endpoint APIs are esily accessable in the swagger documentation. [Click here](http://localhost:3000/docs).

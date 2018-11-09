# revolut-exchange [![CircleCI](https://circleci.com/gh/shchekoldin/revolut-exchange.svg?style=svg)](https://circleci.com/gh/shchekoldin/revolut-exchange)

## How to run
1. Install deps using `npm install`
2. Specify `openexchangerates` app id in `.env` (replace `YOUR_TOKEN` with the vallid one), `pro` account is required
3. Run dev mode using `npm run dev:serve` command and open [localhost:8080](http://localhost:8080) or
   run `npm run dev:build` and open `<PROJECT_ROOT>/dist/index.html`

## How to test
1. Install deps using `npm install`
2. Run `npm run test:lint` for [eslint](https://eslint.org) tests
3. Run `npm run test:jest` for base tests with [Jest](https://jestjs.io)
4. Run `npm run test:flow` for type checking tests with [Flow](https://flow.org)

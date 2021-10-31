import Koa from 'koa'
import Router from 'koa-router'
import priceAPIs from './pricingAPIs';
import machineAPIs from './machineAPIs';

const app = new Koa()
const PORT = process.env.PORT || 1337
const router = new Router()

const { Client } = require('pg')
export const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

priceAPIs(router);
machineAPIs(router);

app
  .use(router.routes())
  .listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  );

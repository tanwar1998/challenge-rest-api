import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser';
import getPricingModelList, { getPricingModelByID, getPricesList } from './pricingAPIs/getPrice';
import savePriceModelData, { savePriceForPriceModel } from './pricingAPIs/savePrice';
import updatePricesByID from './pricingAPIs/updatePriceModel';
import deletePriceData from './pricingAPIs/deletePriceData';
import saveMachineData from './machineAPIs/saveMachineData';
import updateMachineByID from './machineAPIs/updateMachineByID';
import deleteMachineData from './machineAPIs/deleteMachineData';
import getMachinePriceList from './machineAPIs/getMachinePriceList';

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

router
    .use(bodyParser())
    .get('/pricing-models', async(ctx, next) => {
        ctx.body =  await getPricingModelList(ctx, next)
    })

    .get('/pricing-models/:id/prices', async(ctx, next) => {
        ctx.body =  await getPricesList(ctx, next)
    })

    .get('/pricing-models/:id', async(ctx, next) => {
        ctx.body =  await getPricingModelByID(ctx, next)
    })

    .put('/pricing-models/:id', async(ctx, next) => {
        ctx.body =  await updatePricesByID(ctx, next)
    })

    .post('/pricing-models', async(ctx, next) => {
        ctx.body =  await savePriceModelData(ctx, next)
    })

    .post('/pricing-models/:id/prices', async(ctx, next) => {
        ctx.body =  await savePriceForPriceModel(ctx, next)
    })

    .delete('/pricing-models/:pmID/prices/:priceID', async(ctx, next) => {
        ctx.body =  await deletePriceData(ctx, next)
    })

    // machine apis starts from here
    .get('/machines/:machineID/prices', async(ctx, next) => {
        ctx.body =  await getMachinePriceList(ctx, next)
    })

    .put('/machines/:machineID/prices/:pmID', async(ctx, next) => {
        ctx.body =  await updateMachineByID(ctx, next)
    })

    .post('/machines', async(ctx, next) => {
        ctx.body =  await saveMachineData(ctx, next)
    })
    
    .delete('/machines/:machineID/prices/:pmID', async(ctx, next) => {
        ctx.body =  await deleteMachineData(ctx, next)
    })

app
  .use(router.routes())
  .listen(PORT, () =>
    console.log(`Server listening on port ${PORT}`)
  )


module.exports = app;
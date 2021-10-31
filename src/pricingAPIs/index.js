import bodyParser from 'koa-bodyparser';
import getPricingModelList, { getPricingModelByID, getPricesList } from './getPrice';
import savePriceModelData, { savePriceForPriceModel } from './savePrice';
import updatePricesByID from './updatePriceModel';
import deletePriceData from './deletePriceData';

const priceAPIs = (router) => {
    router
    .use(bodyParser())
    .get('/pricing-models', async(ctx, next) => {
        const result =  await getPricingModelList(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .get('/pricing-models/:id/prices', async(ctx, next) => {
        const result =  await getPricesList(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .get('/pricing-models/:id', async(ctx, next) => {
        const result =  await getPricingModelByID(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .put('/pricing-models/:id', async(ctx, next) => {
        const result =  await updatePricesByID(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .post('/pricing-models', async(ctx, next) => {
        const result =  await savePriceModelData(ctx, next)
        ctx.body =result;
    })

    router
    .use(bodyParser())
    .post('/pricing-models/:id/prices', async(ctx, next) => {
        const result =  await savePriceForPriceModel(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .delete('/pricing-models/:pmID/prices/:priceID', async(ctx, next) => {
        const result =  await deletePriceData(ctx, next)
        ctx.body =result
    })
}

export default priceAPIs;
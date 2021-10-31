import bodyParser from 'koa-bodyparser';
import saveMachineData from './saveMachineData';
import updateMachineByID from './updateMachineByID';
import deleteMachineData from './deleteMachineData';
import getMachinePriceList from './getMachinePriceList';

const machineAPIs = (router) => {
    router
    .use(bodyParser())
    .get('/machines/:machineID/prices', async(ctx, next) => {
        console.log('something')
        const result =  await getMachinePriceList(ctx, next)
        ctx.body =result
    })


    router
    .use(bodyParser())
    .put('/machines/:machineID/prices/:pmID', async(ctx, next) => {
        const result =  await updateMachineByID(ctx, next)
        ctx.body =result
    })

    router
    .use(bodyParser())
    .post('/machines', async(ctx, next) => {
        const result =  await saveMachineData(ctx, next)
        ctx.body =result;
    })

    router
    .use(bodyParser())
    .delete('/machines/:machineID/prices/:pmID', async(ctx, next) => {
        console.log('something')
        const result =  await deleteMachineData(ctx, next)
        ctx.body =result
    })
}

export default machineAPIs;
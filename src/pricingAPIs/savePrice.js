import DBQuery from '../DBConnection/db';

const savePriceModelData = async(ctx, next) => {
    const price = ctx.request?.body ? ctx.request.body : {};
    let returnObj = {
        data: {},
        status: 'error',
        error: null
    }
    if(!price.name){
        returnObj.error = 'Please give name';
        return returnObj;
    }
    if(price.isDefault){
        const udpateDefault = await DBQuery( `update pricingmodel set isdefault = false`, []);  
    }

    const results = await DBQuery('INSERT INTO pricingmodel (name, isDefault ) VALUES ($1, $2) RETURNING *', [price.name, price.isDefault ? true: false]);  
    return {
        data: results?.rows ? results.rows[0].id : {},
        status: results ? 'success': 'error'
    }
    
}

export const savePriceForPriceModel = async(ctx, next) => {
    const price = ctx.request?.body ? ctx.request.body : {};
    let returnObj = {
        data: {},
        status: 'error',
        error: null
    }
    if(!price.name){
        returnObj.error = 'Please give name';
        return returnObj;
    }
    if(!price.price){
        returnObj.error = 'Please give price';
        return returnObj;
    }
    if(!price.value){
        returnObj.error = 'Please give value';
        return returnObj;
    }

    const getCurrentModel = await DBQuery(`Select * from pricingmodel where id=${ctx.params.id}`, []);
    if(!getCurrentModel.rows?.length ){
        returnObj.error = 'Price model not found';
        return returnObj;
    }

    const results = await DBQuery('INSERT INTO prices (name, price, value, pricemodelid) VALUES ($1, $2, $3, $4) RETURNING *', [price.name, price.price, price.value, ctx.params.id]);  
    return {
        data: results?.rows ? results.rows[0]?.priceid : {},
        status: results ? 'success': 'error'
    }
    
}


export default savePriceModelData;
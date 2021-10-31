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

    const results = await DBQuery('INSERT INTO machines (name) VALUES ($1) RETURNING *', [price.name]);  
    return {
        data: results?.rows ? results.rows[0].id : {},
        status: results ? 'success': 'error'
    }    
}
export default savePriceModelData;
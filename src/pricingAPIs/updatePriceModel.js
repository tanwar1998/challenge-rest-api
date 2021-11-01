import DBQuery from '../DBConnection/db';

const updatePricesByID = async(ctx, next) => {
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
    let query = `update pricingmodel set name = '${price.name}'`;

    if(price.isDefault || price.isDefault === false){
        query += ` ,isdefault = ${price.isDefault}`
    }

    query += ` where id = ${ctx.params.id}`;

    const results = await DBQuery(query, []);

    return {
        data: results?.rowCount ? {} : null ,
        status: results ? 'success': 'error',
        error: results?.rowCount ? null : 'No data found with id ' + ctx.params.id
    }
    
}

export default updatePricesByID;
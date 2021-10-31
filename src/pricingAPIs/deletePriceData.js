import DBQuery from '../DBConnection/db';

const deletePriceData = async(ctx, next) => {
    const price = ctx.request?.body ? ctx.request.body : {};
    let query = `update prices set deleted = true`;
    query += ` where pricemodelid = ${ctx.params.pmID} and priceID = ${ctx.params.priceID} and deleted = false`;

    const results = await DBQuery(query, []);

    return {
        data: results?.rowCount ? {} : null ,
        status: results ? 'success': 'error',
        error: results?.rowCount ? '' : 'No data found with pmID ' + ctx.params.pmID + ' and priceID ' + ctx.params.priceID
    }
    
}

export default deletePriceData;
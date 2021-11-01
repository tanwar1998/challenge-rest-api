import DBQuery from '../DBConnection/db';

const updateMachineByID = async(ctx, next) => {
    let returnObj = {
        data: {},
        status: 'error',
        error: null
    }

    const defaultPrice = await DBQuery(`SELECT * FROM pricingmodel where id=${ctx.params.pmID}`, []);  

    if(!defaultPrice?.rows?.length){
        returnObj.error = 'No pricing model found with pmID: ' + ctx.params.pmID ;
        return returnObj;
    }

    let query = `update machines set pricingid = ${ctx.params.pmID}  where id = ${ctx.params.machineID}`;

    const results = await DBQuery(query, []);

    return {
        data: results?.rowCount ? {} : null ,
        status: results ? 'success': 'error',
        error: results?.rowCount ? null : 'No data found with id ' + ctx.params.machineID
    }
    
}

export default updateMachineByID;
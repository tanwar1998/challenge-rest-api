import DBQuery from '../DBConnection/db';

const deleteMachineData = async(ctx, next) => {
    let query = `update machines set pricingid = null where pricingid=${ctx.params.pmID} and id = ${ctx.params.machineID}`;

    const results = await DBQuery(query, []);

    return {
        data: results?.rowCount ? {} : null ,
        status: results?.rowCount ? 'success': 'error',
        error: results?.rowCount ? '' : 'No data found with pmID ' + ctx.params.pmID + ' and machineID ' + ctx.params.machineID
    }
}

export default deleteMachineData;
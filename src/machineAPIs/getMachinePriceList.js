import DBQuery from '../DBConnection/db';

const getMachinePriceList = async(ctx, next) => {
      let returnObj = {
            data: {},
            status: 'error',
            error: null
        }
      const machineList = await DBQuery(`SELECT * FROM machines where id = ${ctx.params.machineID}`, []);

      if(! machineList?.rows[0]?.pricingid  ){
        returnObj.error = 'No pricing model found with machineID: ' + ctx.params.machineID ;
        return returnObj;
      }

      const priceList = await DBQuery(`Select name, value, price from prices where pricemodelid=${machineList?.rows[0]?.pricingid} and deleted != true`, []);
      return {
          data: priceList?.rows,
          status: priceList?.rows ? 'success': 'error',
          error: priceList?.rows ? null : 'Some internal error'
      }
}

export default getMachinePriceList;
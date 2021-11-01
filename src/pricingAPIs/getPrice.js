import DBQuery from '../DBConnection/db';

const getPricingListByModelList  = (list) => {
    return new Promise(async(resolve, reject) => {
        let arrayData = [];
        for (const rows of list) {
            const otherPriceList = await DBQuery(`Select name, value, price from prices where pricemodelid=${rows.id} and deleted != true`, []);

            const data = {
                [rows.id] : {
                    id: rows.id,
                    name: rows.name,
                    pricing: otherPriceList.rows
                }
            }
            arrayData.push(data);
        }
        resolve(arrayData);

    })
  }
  
const getPricingModelList = async(ctx, next) => {
      let initialDefaultPricingList = [];
      let initialOtherPricingList = [];

      const defaultPriceModelList = await DBQuery(`SELECT * FROM pricingmodel where isdefault=${true}`, []);  
      const otherPriceModelList = await DBQuery(`SELECT * FROM pricingmodel where isdefault!=${true}`, []);

      if(defaultPriceModelList?.rows?.length){
          const defaultPriceList = await DBQuery(`Select name, value, price from prices where pricemodelid=${defaultPriceModelList?.rows[0].id} and deleted != true`, []);
          initialDefaultPricingList = defaultPriceList.rows;
      }

      if(otherPriceModelList?.rows?.length){
        initialOtherPricingList = await getPricingListByModelList(otherPriceModelList.rows);
      }

      const returnData = {
          default_pricing: initialDefaultPricingList,
          other_pricing: initialOtherPricingList,
      }
      return {
          data: returnData,
          status: otherPriceModelList ? 'success': 'error',
          error: results?.rows ? null : 'Some internal error'
      }
}

export const getPricingModelByID = async(ctx, next) => {

    let resultFinalList = [];
    const results = await DBQuery(`Select * from pricingmodel where id=${ctx.params.id}` , []);

    if(results?.rows?.length){
        resultFinalList = await getPricingListByModelList(results.rows);
    }

    return {
        data: resultFinalList,
        status: results ? 'success': 'error',
        error: results?.rows ? null : 'Some internal error'
    }
}


export const getPricesList = async(ctx, next) => {    
    const results = await DBQuery(`Select name, value, price from prices where pricemodelid=${ctx.params.id} and deleted != true`, []);
    
    return {
        data: results?.rows?.length ? results.rows : [],
        status: results ? 'success': 'error',
        error: results?.rows ? null : 'Some internal error'
    }
}

export default getPricingModelList;
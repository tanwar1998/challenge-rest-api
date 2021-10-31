import { client } from '../index';

const DBQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        return client.query(query, data, (error, results) => {
                if (error) {
                    resolve(null)
                }
                resolve(results)
            })
    });
}

export default DBQuery;


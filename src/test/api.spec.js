const request = require('supertest')
const app = require('../index');


test('/not found', async () => {
    const response = await request(app.callback()).get('/not-found');
    expect(response.status).toEqual(404)
})

test('/pricing-models', async () => {
    const response = await request(app.callback()).get('/pricing-models');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(Object.keys(response.body.data.default_pricing)).toBeDefined()
    expect(Object.keys(response.body.data.other_pricing)).toBeDefined()
})


test('/pricing-models/:id/prices', async () => {
    const response = await request(app.callback()).get('/pricing-models/4/prices');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/pricing-models/:id', async () => {
    const response = await request(app.callback()).get('/pricing-models/1');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/pricing-models/:id', async () => {
    const requestBody  = {
        "name": " updated",
        "isDefault": false,
        "value": 88
    }
    const response = await request(app.callback()).put('/pricing-models/1').send(requestBody);
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/pricing-models', async () => {
    const requestBody  = {
        "name": " testing case model",
        "isDefault": false,
        "value": 88
    }
    const response = await request(app.callback()).post('/pricing-models').send(requestBody);
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})


test('/pricing-models/:id/prices', async () => {
    const requestBody  ={
        "name": "unit test cases for post request",
        "price": 65,
        "value": 88
    }
    const response = await request(app.callback()).post('/pricing-models/3/prices').send(requestBody);
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})


test('/pricing-models/:pmID/prices/:priceID', async () => {
    const response = await request(app.callback()).delete('/pricing-models/3/prices/9');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/machines/:machineID/prices', async () => {
    const response = await request(app.callback()).get('/machines/3/prices');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/machines/:machineID/prices/:pmID', async () => {
    const response = await request(app.callback()).put('/machines/4/prices/4');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})

test('/machines', async () => {
    const requestBody  = {
        "name": "unit test case machine"
    }
    const response = await request(app.callback()).post('/machines').send(requestBody);
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})


test('/machines/:machineID/prices/:pmID', async () => {
    const response = await request(app.callback()).delete('/machines/4/prices/4');
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.status).toEqual('success')
    expect(response.body.error).toEqual(null)
    expect(Object.keys(response.body.data)).toBeDefined()
})
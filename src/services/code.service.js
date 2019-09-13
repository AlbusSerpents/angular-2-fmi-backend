const request = require('request-promise');
const errorCodes = require('./../shared/error.codes');
const interpreter = require('../interpreter/interpreter.facade');

exports.run = async (body) => {
    const requestOptions = {
        body: body,
        json: true,
        method: 'POST',
        uri: 'https://okwqdg5u7c.execute-api.us-east-1.amazonaws.com/prod/node-test',
    };

    return await request(requestOptions);
}
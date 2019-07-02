const errorCodes = require('./../shared/error.codes');
const interpreter = require('../interpreter/interpreter.facade');

exports.run = (body) => {
    if (body.code && body.input) {
        return interpreter.interpret(body);
    } else {
        return { error: errorCodes.MISSING_FIELD };
    }
}
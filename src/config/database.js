var expressMongoDb = require('express-mongo-db');

exports.mongoConnector = expressMongoDb(process.env.MONGO_URL);

const mongo = require('mongodb');
const users = require('./users.service');
const problems = require('./problems.service');
const competitions = require('./compeitions.service');
const errorCodes = require('./../shared/error.codes');

exports.participate = async (id, userId, db) => {
    const condition = {
        $and:
            [
                { _id: new mongo.ObjectID(id) },
                { "creator.id": { $ne: userId } }
            ]
    };

    const user = await users.findById(userId, db);
    const addToSet = { $addToSet: { submitions: { userId: user.id, name: user.name, score: 0 } } };

    return await compeitionsCollection(db)
        .updateOne(condition, addToSet, { upsert: false })
        .then(result => result.matchedCount)
        .then(updated => updated === 1 ? { score: 0 } : { error: errorCodes.UPDATE_FAILED });
}

exports.leave = async (id, userId, db) => {
    const condition = { _id: new mongo.ObjectID(id) };
    const pull = { $pull: { submitions: { userId } } };

    return await compeitionsCollection(db)
        .updateOne(condition, pull, { upsert: false })
        .then(result => result.matchedCount)
        .then(updated => updated === 1 ? null : { error: errorCodes.UPDATE_FAILED });
}

function compeitionsCollection(db) {
    return db.collection('competitions');
}
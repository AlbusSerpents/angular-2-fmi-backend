const mongo = require('mongodb');
const errorCodes = require('./../shared/error.codes');
const users = require('./users.service');
const problems = require('./problems.service');

exports.findAll = async ({ search }, db) => {
    const fields = { name: 1, creator: 1 };
    const fullCondition = {
        $or: [
            { "creator.name": { $regex: `.*${search}.*`, '$options': 'i' } },
            { "name": { $regex: `.*${search}.*`, '$options': 'i' } }]
    };

    const condition = search ? fullCondition : {};

    return await compeitionsCollection(db)
        .find(condition, fields)
        .toArray()
        .then(arr => arr.map(competition => {
            return { id: competition._id, name: competition.name, creatorId: competition.creator.id, creatorName: competition.creator.name }
        }));
}

exports.create = async ({ name, problemIds }, userId, db) => {
    const error = validateCompetition({ name, problemIds });
    if (error) {
        return error;
    }

    const problemObjects = await problems
        .findByIds(problemIds, db)
        .then(probs => probs.map(problem => { return { id: problem._id, name: problem.name } }));

    if (problemIds.length !== problemObjects.length) {
        return { error: errorCodes.INVALID_PROBLEMS };
    }

    const creator = await users.findById(userId, db);
    const competition = { name, creator: { id: creator.id, name: creator.name }, problems: problemObjects };

    return await compeitionsCollection(db)
        .insertOne(competition)
        .then(result => { return { id: result.insertedId, name }; });

}

function validateCompetition({ name, problemIds }) {
    if (!name || name.trim() === '') {
        console.log(`name: ${name.trim()}`);
        return { error: errorCodes.MISSING_FIELD };
    } else if (!problemIds || problemIds === []) {
        console.log(problemIds);
        return { error: errorCodes.MISSING_FIELD };
    }
}

function compeitionsCollection(db) {
    return db.collection('competitions');
}
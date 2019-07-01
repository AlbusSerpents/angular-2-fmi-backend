const mongo = require('mongodb');
const users = require('./users.service');
const solutions = require('./solutions.service');
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

exports.submit = async (competitionId, solution, userId, db) => {
    const hasParticipated = await findScoreForUser(competitionId, userId, db);

    if (hasParticipated.error) {
        return { error: errorCodes.NOT_PARTICIPATING_IN_COMPETITION };
    }

    const problemId = solution.problemId;
    const previousTries = await findSolvedForUser(competitionId, userId, problemId, db);
    const result = await solutions.submitSolution(solution, userId, db);
    const pointsIncrease = result.points - previousTries.score;

    if (Number.isNaN(pointsIncrease) || pointsIncrease <= 0) {
        return await findScoreForUser(competitionId, userId, db);
    }

    const updateErrors = await increasePoints(competitionId, userId, pointsIncrease, db);
    if (updateErrors) {
        return updateErrors;
    } else {
        recordSubmition(competitionId, userId, problemId, result.points, db);
        return await findScoreForUser(competitionId, userId, db);
    }
}

exports.leave = async (id, userId, db) => {
    const condition = { _id: new mongo.ObjectID(id) };
    const pull = { $pull: { submitions: { userId } } };

    return await compeitionsCollection(db)
        .updateOne(condition, pull, { upsert: false })
        .then(result => result.matchedCount)
        .then(updated => updated === 1 ? null : { error: errorCodes.UPDATE_FAILED });
}

async function recordSubmition(competitionId, userId, problemId, points, db) {
    const condition = { _id: new mongo.ObjectID(competitionId), "submitions.userId": userId };
    return await compeitionsCollection(db)
        .updateOne(condition, { $addToSet: { "submitions.$.solved": { problemId, points } } }, { upsert: false })
        .then(result => result.matchedCount)
        .then(updated => updated === 1 ? null : { error: errorCodes.UPDATE_FAILED });
}

async function increasePoints(competitionId, userId, pointsIncrease, db) {
    const condition = { _id: new mongo.ObjectID(competitionId), "submitions.userId": userId };
    return await compeitionsCollection(db)
        .updateOne(condition, { $inc: { "submitions.$.score": pointsIncrease } }, { upsert: false })
        .then(result => result.matchedCount)
        .then(updated => updated === 1 ? null : { error: errorCodes.UPDATE_FAILED });
}

async function findScoreForUser(competitionId, userId, db) {
    const condition = { _id: new mongo.ObjectID(competitionId) };
    const fields = { _id: 0, submitions: { $elemMatch: { userId } } };

    return await compeitionsCollection(db)
        .findOne(condition, fields)
        .then(result => result.submitions && result.submitions[0] ? presentSubmition(result.submitions[0]) : { error: errorCodes.MISSING });
}

function presentSubmition({ userId, name, score }) {
    return { userId, name, score };
}

async function findSolvedForUser(competitionId, userId, problemId, db) {
    const condition = { _id: new mongo.ObjectID(competitionId) };
    const fields = { _id: 0, submitions: { $elemMatch: { userId } } };

    return await compeitionsCollection(db)
        .findOne(condition, fields)
        .then(result => result.submitions[0] ? result.submitions[0] : null)
        .then(submition => submition.solved ? submition.solved : [])
        .then(solved => solved.filter(solve => solve.problemId === problemId))
        .then(final => final[0] ? final[0] : { problemId, score: 0 });
}

function compeitionsCollection(db) {
    return db.collection('competitions');
}
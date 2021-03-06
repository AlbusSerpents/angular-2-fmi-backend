const mongo = require('mongodb');
const errorCodes = require('./../shared/error.codes');
const users = require('./users.service');

exports.create = async (problem, creatorId, db) => {
    const errors = validateProblem(problem);
    if (errors) {
        return errors;
    }

    const entityTests = problem.tests.map(test => { return { input: test.input, expected: test.expected, points: test.points } });
    const { id, name } = await users.findById(creatorId, db);
    const entity = { name: problem.name, description: problem.description, creator: { id, name }, tests: entityTests };
    const result = await problemsCollection(db).insertOne(entity);

    return { id: result.insertedId, name: problem.name };
}

exports.findByIds = async (ids, db) => {
    const idsObjects = ids.map(id => new mongo.ObjectID(id));
    const fields = { _id: 1, name: 1 };
    const condition = { _id: { $in: idsObjects } };
    return await problemsCollection(db).find(condition, fields).toArray();
}

exports.findAll = async ({ search }, db) => {
    const condition = search ?
        {
            $or: [
                { "name": { $regex: `.*${search}.*`, '$options': 'i' } },
                { "creator.name": { $regex: `.*${search}.*`, '$options': 'i' } }
            ]
        } :
        {};
    const fields = { name: 1, creator: 1 };
    const result = await problemsCollection(db).find(condition, fields).toArray();
    return result.map(object => { return { id: object._id, name: object.name, creatorId: object.creator.id, creatorName: object.creator.name } });
}

exports.findById = async (id, db) => {
    const condition = { _id: new mongo.ObjectID(id) };
    const fields = { name: 1, creator: 1, description: 1 };
    const result = await problemsCollection(db).findOne(condition, fields);
    if (!result) {
        return { error: errorCodes.MISSING };
    } else {
        return {
            id: result._id,
            name: result.name,
            creatorId: result.creator.id,
            creatorName: result.creator.name,
            description: result.description
        };
    }
}

exports.findTests = async (id, user, db) => {
    const condition = { _id: new mongo.ObjectID(id) };
    const result = await problemsCollection(db).findOne(condition, { tests: 1, "creator.id": 1 });
    if (!result) {
        return { error: errorCodes.MISSING };
    } else if (!result.creator.id.equals(user)) {
        return { error: errorCodes.FORBIDDEN };
    } else {
        return result.tests;
    }
}

exports.update = async (id, body, user, db) => {
    const errors = validateProblem(body);
    if (errors) {
        return errors;
    }

    const condition = { _id: new mongo.ObjectID(id), "creator.id": user };
    const set = { $set: { name: body.name, tests: body.tests, description: body.description } };
    const result = await problemsCollection(db).updateOne(condition, set, { upsert: false });

    return result.matchedCount === 1 ? {} : { error: errorCodes.UPDATE_FAILED };
}

exports.deleteById = async (id, user, db) => {
    const condition = { _id: new mongo.ObjectID(id), "creator.id": user };
    const result = await problemsCollection(db).deleteOne(condition);

    return result.deletedCount === 1 ? {} : { error: errorCodes.DELETE_FAILED };
}

function validateProblem({ name, description, tests }) {
    if (!name) {
        return { error: errorCodes.MISSING_FIELD };
    }
    if (!description) {
        return { error: errorCodes.MISSING_FIELD };
    }
    if (!tests || tests === []) {
        return { error: errorCodes.NO_TESTS_PROVIDED };
    } else {
        return validateTests(tests);
    }
}

function validateTests(tests) {
    return tests
        .map(test => validateTest(test))
        .reduce((base, current) => { return base ? base : current; }, null);
}

function validateTest({ input, expected, points }) {
    if (!input || !expected) {
        return { error: errorCodes.MISSING_FIELD };
    } else if (!points || points <= 0) {
        return { error: errorCodes.NO_POINTS };
    } else {
        return null;
    }
}

function problemsCollection(db) {
    return db.collection('problems');
}
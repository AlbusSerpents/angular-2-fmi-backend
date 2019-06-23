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
        return tests
            .map(test => validateTest(test))
            .reduce((base, current) => {
                if (!base) {
                    return current;
                } else {
                    return base;
                }
            }, null);
    }
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
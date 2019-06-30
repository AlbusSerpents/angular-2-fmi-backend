const mongo = require('mongodb');
const errorCodes = require('./../shared/error.codes');
const users = require('./users.service');
const parser = require('../interpreter/interpreter.facade');

exports.submitSolution = async ({ problemId, code }, user, db) => {
    const idCondition = { _id: new mongo.ObjectID(problemId) };

    const problem = await problemsCollection(db).findOne(idCondition);
    const result = calculateResults(problem, code);

    const { name } = await users.findById(user, db);
    const submition = { user: name, submittedAt: new Date(), points: result.points, tests: result.results };

    const set = { $push: { solutions: submition } };

    return await problemsCollection(db)
        .updateOne(idCondition, set, { upsert: false })
        .then(res => res.matchedCount)
        .then(count => count === 1)
        .then(updated => updated ? result : { error: errorCodes.SUBMITION_FAILED });
}

exports.findAll = async (problemId, db) => {
    const fields = { solutions: 1 };
    const idCondition = { _id: new mongo.ObjectID(problemId) };
    return await problemsCollection(db)
        .findOne(idCondition, fields)
        .then(result => result.solutions)
        .then(solutions => solutions ? solutions : [])
        .then(solutions => solutions.map(solution => presentSolution(solution)));
}

function presentSolution({ user, submittedAt, points }) {
    return { user, submittedAt, points };
}

function calculateResults(problem, code) {
    return problem
        .tests
        .map(test => executeTest(test, code))
        .reduce(({ points, results }, test) => {
            results.push(test.passed);
            return { points: points + test.points, results }
        }, { points: 0, results: [] });
}

function executeTest({ input, expected, points }, code) {
    const parsed = parser.run({ code, input });
    if (parsed) {
        const actual = parsed.output;
        return actual === String(expected) ? { passed: true, points } : { passed: false, points: 0 };
    } else {
        return { passed: false, points: 0 };
    }
}

function problemsCollection(db) {
    return db.collection('problems');
}
var mongo = require('mongodb');
const crypto = require('crypto');
const errorCodes = require('./../shared/error.codes');
const algorithm = 'aes-256-ctr';

exports.create = async (registration, db) => {
    const errors = validateRegistration(registration);
    if (!errors) {
        const encrypted = encrypt(registration.password);
        const user = { name: registration.name, email: registration.email, password: encrypted, username: registration.username };

        const result = await usersCollection(db).insertOne(user);
        return { id: result.insertedId, name: user.name, username: user.username, email: user.email };
    } else {
        return errors;
    }
}

exports.findByCredentials = async ({ username, password }, db) => {
    const user = await usersCollection(db).findOne({ username });
    const encrypted = encrypt(password);
    if (user && encrypted === user.password) {
        return { id: user._id };
    } else {
        return { error: errorCodes.UNAUTHENTICATED }
    }
}

exports.findMe = async (id, db) => {
    const user = await usersCollection(db).findOne({ _id: id });
    return user ? { id: user._id, name: user.name, username: user.username, email: user.email } : { error: errorCodes.MISSING };
}
exports.findById = async (id, db) => {
    const user = await usersCollection(db).findOne({ _id: new mongo.ObjectID(id) });
    return user ? { id: user._id, name: user.name, email: user.email } : { error: errorCodes.MISSING };
}

exports.update = async (id, user, db) => {
    const errors = validataProfile(user);
    if (errors) {
        return errors;
    }

    const result = await usersCollection(db).updateOne(
        { _id: new mongo.ObjectID(id) },
        { $set: { name: user.name, email: user.email } },
        { upsert: false });

    if (result.matchedCount !== 1) {
        return { error: errorCodes.UPDATE_FAILED };
    }
}

function usersCollection(db) {
    return db.collection('users');
}

function validateRegistration(user) {
    if (!user.password) {
        return { error: errorCodes.MISSING_FIELD };
    }
    if (!user.username) {
        return { error: errorCodes.MISSING_FIELD };
    }
    return validataProfile(user);
}

function validataProfile({ email, name }) {
    if (!email) {
        return { error: errorCodes.MISSING_FIELD };
    }
    if (!name) {
        return { error: errorCodes.MISSING_FIELD };
    }
}

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, text)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.makeResponse = (result, res, statusCode) => {
    if (!result || !result.error) {
        res.status(statusCode).json(result);
    } else {
        const error = result.error;
        res.status(error.status).json({ code: error.code });
    }
}
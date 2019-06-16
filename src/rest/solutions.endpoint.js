module.exports = (app) => {
    app.post('/problems/:id/solve', (req, res) => {
        console.log('Submit a solution for a problem');
        console.log(req.body);
        console.log(req.params.id);
    })

    app.get('/problems/:id/solutions/:userId', (req, res) => {
        console.log('Show my previous solutions (scores and id)');
        console.log(req.params.id);
        console.log(req.params.userId);
    })

    app.get('/problems/:id/solutions/:userId/:solutionId', (req, res) => {
        console.log('Get a complete solution');
        console.log(req.params.id);
        console.log(req.params.userId);
        console.log(req.params.solutionId);
    })
}
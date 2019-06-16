module.exports = (secured) => {
    secured.post('/problems/:id/solve', (req, res) => {
        console.log('Submit a solution for a problem');
        console.log(req.body);
        console.log(req.params.id);

        res.status(201).json();
    })

    secured.get('/problems/:id/solutions/:userId', (req, res) => {
        console.log('Show my previous solutions (scores and id)');
        console.log(req.params.id);
        console.log(req.params.userId);

        res.status(200).json();
    })

    secured.get('/problems/:id/solutions/:userId/:solutionId', (req, res) => {
        console.log('Get a complete solution');
        console.log(req.params.id);
        console.log(req.params.userId);
        console.log(req.params.solutionId);

        res.status(200).json();
    })
}
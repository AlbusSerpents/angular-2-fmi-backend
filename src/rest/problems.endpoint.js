module.exports = (secured) => {
    secured.get('/problems/', (req, res) => {
        console.log(`List all problems, short description`);
        console.log(req.params);

        res.status(200).json();
    });

    secured.get('/problems/:id', (req, res) => {
        console.log(' Get problem details');
        console.log(req.params.id);

        res.status(200).json();
    })

    secured.get('/problems/:id/statistics', (req, res) => {
        console.log('Get problem statistics');
        console.log(req.params.id);

        res.status(200).json();
    })

    secured.post('/problems', (req, res) => {
        console.log('Create problem');
        console.log(req.body);

        res.status(201).json();
    })

    secured.put('/problems/:id/manage', (req, res) => {
        console.log(`Change problem's description, points, etc`);
        console.log(req.params.id);
        console.log(req.body);

        res.status(204).json();
    })

    secured.put('/problems/:id/tests', (req, res) => {
        console.log(`Set new tests for the problem {expected, actual}`);
        console.log(req.params.id);
        console.log(req.body);

        res.status(204).json();
    })

    secured.delete('/problems/:id', (req, res) => {
        console.log(`Deletes a problem, only for the creator`);
        console.log(req.params.id);

        res.status(204).json();
    })
}
module.exports = (app) => {
    app.get('/problems/', (req, res) => {
        console.log(`List all problems, short description`);
        console.log(req.params);
    });

    app.get('/problems/:id', (req, res) => {
        console.log(' Get problem details');
        console.log(req.params.id);
    })

    app.get('/problems/:id/statistics', (req, res) => {
        console.log('Get problem statistics');
        console.log(req.params.id);
    })

    app.post('/problems', (req, res) => {
        console.log('Create problem');
        console.log(req.body);
    })

    app.put('/problems/:id/manage', (req, res) => {
        console.log(`Change problem's description, points, etc`);
        console.log(req.params.id);
        console.log(req.body);
    })

    app.put('/problems/:id/tests', (req, res) => {
        console.log(`Set new tests for the problem {expected, actual}`);
        console.log(req.params.id);
        console.log(req.body);
    })

    app.delete('/problems/:id', (req, res) => {
        console.log(`Deletes a problem, only for the creator`);
        console.log(req.params.id);
    })
}
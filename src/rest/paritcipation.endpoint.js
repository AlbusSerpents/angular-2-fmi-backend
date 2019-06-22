module.exports = (secured) => {
    secured.post('/competitions/:id/participate', (req, res) => {
        console.log(`Enter competition participation`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.delete('/competitions/:id/leave', (req, res) => {
        console.log(`Leave competition participation`)
        console.log(req.params);

        res.status(204).json();
    });


    secured.post('/competitions/:id/:problemId', (req, res) => {
        console.log(`Submit a solution to a problem in a competition`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.get('/competitions/:id/results', (req, res) => {
        console.log(`Chenck my result in a competition`)
        console.log(req.params);

        res.status(200).json();
    });
}
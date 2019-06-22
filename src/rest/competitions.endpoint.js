module.exports = (secured) => {
    secured.get('/competitions/', (req, res) => {
        console.log(`Get list of competitions`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.post('/competitions/', (req, res) => {
        console.log(`Create new competition`)
        console.log(req.params);

        res.status(201).json();
    });

    secured.get('/competitions/:id', (req, res) => {
        console.log(`Get competition's details`)
        console.log(req.params);

        res.status(200).json();
    });

    secured.put('/competitions/:id', (req, res) => {
        console.log('Edit competition');
        console.log(req.body);

        res.status(204).json();
    })

    secured.delete('/competitions/:id', (req, res) => {
        console.log(`Delete a competition`)

        res.status(204).json();
    })

    secured.get('/competitions/:id/contestants', (req, res) => {
        console.log(`Show all contestants in a competition`)

        res.status(204).json();
    })

    secured.get('/competitions/:id/solutions', (req, res) => {
        console.log(`List all solutions for a competition`)

        res.status(200).json();
    })
}
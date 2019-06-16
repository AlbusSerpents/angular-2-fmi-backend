const express = require('express');
const app = express();
app.use(express.json());

require('./src/rest/registration.endpoint')(app);
require('./src/rest/sessions.endpoint')(app);
require('./src/rest/users.endpoint')(app);
require('./src/rest/problems.endpoint')(app);
require('./src/rest/solutions.endpoint')(app);

app.get('/status', (req, res) => {
  const status = {
    version: '1.0.0',
    name: 'Brain Hack server'
  };
  res.json(status);
});

app.listen(3000, () => {
  console.log(`Server running`);
});
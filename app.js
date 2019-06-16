const express = require('express');
const security = require('./src/config/security');
const securityRouter = require('express').Router();

const app = express();

app.use(express.json());
securityRouter.all('*', security.filter);
app.use(securityRouter);

require('./src/rest/registration.endpoint')(app);
require('./src/rest/sessions.endpoint')(app, securityRouter);
require('./src/rest/users.endpoint')(securityRouter);
require('./src/rest/problems.endpoint')(securityRouter);
require('./src/rest/solutions.endpoint')(securityRouter);

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
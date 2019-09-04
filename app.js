require('dotenv').config()

const express = require('express');
const database = require('./src/config/database');
var cors = require('cors')

const security = require('./src/config/security');
const securityRouter = require('express').Router();

const app = express();
app.use(database.mongoConnector);
app.use(cors())

app.use(express.json());

securityRouter.all('/problems', security.filter);
securityRouter.all('/problems/*', security.filter);
securityRouter.all('/users/*', security.filter);
securityRouter.all('/users', security.filter);
securityRouter.all('/competitions/*', security.filter);
securityRouter.all('/competitions', security.filter);
securityRouter.all('/run', security.filter);
securityRouter.all('/logout', security.filter);

app.use(securityRouter);

require('./src/rest/registration.endpoint')(app);
require('./src/rest/sessions.endpoint')(app, securityRouter);
require('./src/rest/users.endpoint')(securityRouter);
require('./src/rest/problems.endpoint')(securityRouter);
require('./src/rest/solutions.endpoint')(securityRouter);
require('./src/rest/competitions.endpoint')(securityRouter);
require('./src/rest/paritcipation.endpoint')(securityRouter);
require('./src/rest/code.endpoint')(securityRouter);

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
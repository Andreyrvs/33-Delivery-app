const express = require('express');
const Factory = require('../Factory');
// import Auth from '../middlewares/TokenAunth';
// import Validations from '../middlewares/Validations';
const loginRouter = express.Router();
const login = Factory.login();

loginRouter.post('/login', login);

module.exports = loginRouter;
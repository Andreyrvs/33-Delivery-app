const express = require('express');
const Factory = require('../Factory');

// import Auth from '../middlewares/TokenAunth';
// import Validations from '../middlewares/Validations';

const UserController = Factory.user();

const userRouter = express.Router();

userRouter.post('/login', UserController.login);
userRouter.post('/register', UserController.create);

module.exports = userRouter;

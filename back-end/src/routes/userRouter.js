const express = require('express');
const Factory = require('../Factory');
const Validations = require('../middlewares/ValidationsMiddleware');

// import Auth from '../middlewares/TokenAunth';
// import Validations from '../middlewares/Validations';

const UserController = Factory.user().userController;

const userRouter = express.Router();

userRouter.post('/login', UserController.login);
userRouter.post('/register', Validations.user, UserController.create);

module.exports = userRouter;

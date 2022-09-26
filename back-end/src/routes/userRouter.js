const express = require('express');
const Factory = require('../Factory');
const Validations = require('../middlewares/ValidationsMiddleware');

const UserController = Factory.user().userController;

const userRouter = express.Router();

userRouter.get('/user/get-all', UserController.read);
userRouter.post('/login', UserController.login);
userRouter.post('/register', Validations.user, UserController.create);
userRouter.delete('/user/delete/:id', UserController.delete);

module.exports = userRouter;

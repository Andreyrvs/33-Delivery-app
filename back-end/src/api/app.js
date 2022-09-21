const express = require('express');

const errorMiddleware = require('../middlewares/errorMiddleware');

const Router = require('../routes/Router');

const app = express();
app.use(express.json());

app.use(Router);
app.use(errorMiddleware);

// app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

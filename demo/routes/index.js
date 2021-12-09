const express = require('express');
const router = express.Router();

const advRouter = require('./user');

function route(app) {
    app.use('/', advRouter);
}

module.exports = route;
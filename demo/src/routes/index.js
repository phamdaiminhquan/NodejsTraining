const advRouter = require('./user');

function route(app) {
    app.use('/', advRouter);
}

module.exports = route;
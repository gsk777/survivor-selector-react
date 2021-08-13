const dbRoutes = require('./db');
const usersRoutes = require('./users');

const appRouter = (app, fs) => {
    dbRoutes(app, fs);
    usersRoutes(app, fs);
};

module.exports = appRouter;
const dbRoutes = require('./db');

const appRouter = (app, fs) => {
    dbRoutes(app, fs);
};

module.exports = appRouter;
const dbRoutes = (app, fs) => {
    const dataPath = './data/db.json';

    app.get('/watchlist', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    app.put('/watchlist', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const update = JSON.parse(data);
            update.watchlist = req.body;
            fs.writeFile(dataPath, JSON.stringify(update), 'utf8', err => {
                if (err) {
                    throw err;
                }
                res.status(200).send('watchlist updated');
            })
        })
    });
};

module.exports = dbRoutes;
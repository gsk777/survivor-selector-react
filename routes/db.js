const jwt = require('jsonwebtoken');

const dbRoutes = (app, fs) => {
    const dataPath = './data/db.json';

    const PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub');

    // request via MyWatchlist.js to verify user & access watchlist data from db.json
    app.get('/db', (req, res) => {
        const token = (req.headers.authorization);

        jwt.verify(token, PUBLIC_KEY, {format: 'PKCS8', algorithms: ['RS256']}, (err, decoded) => {
            console.log(decoded);
            if (err !== null) {
                console.log(err.message);
                throw new Error('token expired');
            } else {
                const userId = decoded.sub;
                fs.readFile(dataPath, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    res.send(JSON.parse(data)['watchlist'][userId]);
                })
            }
        })
    });

    // request via MyWatchlist.js to verify user & update watchlist data in db.json
    app.put('/db', (req, res) => {
        const token = (req.headers.authorization);

        jwt.verify(token, PUBLIC_KEY, {format: 'PKCS8', algorithms: ['RS256']}, (err, decoded) => {
            if (err !== null) {
                console.log(err.message);
                throw new Error('token expired');
            } else {
                const userId = decoded.sub;
                fs.readFile(dataPath, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const update = JSON.parse(data);
                    update.watchlist[userId] = req.body;
                    fs.writeFile(dataPath, JSON.stringify(update), 'utf8', err => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).send("watchlist updated successfully");
                    })
                })
            }
        })
        
    });
};

module.exports = dbRoutes;
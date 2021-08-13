const jwt = require('jsonwebtoken');

const dbRoutes = (app, fs) => {
    const dataPath = './data/db.json';

    const PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub');

    app.get('/db', (req, res) => {
        const token = (req.headers.authorization);

        jwt.verify(token, PUBLIC_KEY, {format: 'PKCS8', algorithms: ['RS256']}, (err, decoded) => {
            console.log(decoded);
            if (err !== null) {
                console.log(err.message);
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

    app.put('/db', (req, res) => {
        const token = (req.headers.authorization);

        jwt.verify(token, PUBLIC_KEY, {format: 'PKCS8', algorithms: ['RS256']}, (err, decoded) => {
            if (err !== null) {
                console.log(err.message);
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
                        res.status(200).send('watchlist updated');
                    })
                })
            }
        })
        
    });
};

module.exports = dbRoutes;
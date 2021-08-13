const jwt = require('jsonwebtoken');

const usersRoutes = (app, fs) => {
    const dataPath = './data/users.json';

    const PRIVATE_KEY = fs.readFileSync('./jwtRS256.key');

    const validateUser = (users, email, password) => {
        for (let i = 0; i < users.length; i++) {
            if ((users[i]["email"] === email) && (users[i]["password"] === password)) {
                return [ users[i]["id"], i, true ];
            }
        }
        return [undefined, false];
    };

    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        })
    })

    app.post('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data)["users"];
            const [userId, index, valid] = validateUser(parsed, req.body.email, req.body.password);
            

            if (valid) {
                const payload = {
                    "name": parsed[index].name,
                    "email": parsed[index].email
                }
                const token = jwt.sign(payload, {key: PRIVATE_KEY, passphrase: "pebble18"}, {
                    algorithm: 'RS256',
                    expiresIn: 30000,
                    subject: userId.toString()
                });
                console.log(token);

                res.status(200).json(token);

            } else {
                res.sendStatus(401);
            }
        })
    })
}

module.exports = usersRoutes;
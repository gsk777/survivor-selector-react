const jwt = require('jsonwebtoken');

const usersRoutes = (app, fs) => {
    const dataPath = './data/users.json';

    const PRIVATE_KEY = fs.readFileSync('./jwtRS256.key');

    // Validation for user on Login attempt
    const validateUser = (users, email, password) => {
        for (let i = 0; i < users.length; i++) {
            if ((users[i]["email"] === email) && (users[i]["password"] === password)) {
                return [ users[i]["id"], i, true ];
            }
        }
        return [undefined, false];
    };

    // Confirming availability of both username and email on signup submission
    const validateNewUser = (users, username, email) => {
        let status = [true, true];
        for (let i = 0; i < users.length; i++) {
            if (!status[0] && !status[1]) {
                break;
            }
            if (users[i]["username"] === username) {
                status[0] = false;
            }
            if (users[i]["email"] === email) {
                status[1] = false;
            }
        }
        return status;
    }

    app.get('/login', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        })
    })

    // Login authentication
    app.post('/login', (req, res) => {
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
                    expiresIn: 3600,
                    subject: userId.toString()
                });
                console.log(token);

                res.status(200).json(token);

            } else {
                res.sendStatus(401);
            }
        })
    })

    // New User Submission
    app.post('/newuser', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data);
            const status = validateNewUser(parsed["users"], req.body.username, req.body.email);

            if ((status[0] && status[1]) && (req.body.password === req.body.confirm)){
                console.log('writing new user to users.json');
                res.status(200).send(status);
                let len = parsed.users.length;
                console.log(len);
                parsed.users.push({
                    "id": len+1,
                    "username": req.body.username,
                    "email": req.body.email,
                    "password": req.body.password
                })
                fs.writeFile(dataPath, JSON.stringify(parsed), 'utf-8', err => {
                    if (err) {
                        throw err;
                    }
                })
            } else {
                res.status(200).send(status);
            }
        })
    })
}

module.exports = usersRoutes;
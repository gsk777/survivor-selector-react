require('dotenv').config();
const crypto  = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const usersRoutes = (app, fs) => {
    const dataPath = './data/users.json';

    const PRIVATE_KEY = fs.readFileSync('./jwtRS256.key');
    const PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub');

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

    // Confirming user email exists for reset password request
    const validateEmail = (users, email) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["email"] === email) {
                return [true, i];
            }
        }
        return [false];
    }

    // Login authentication via Login.js
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

    // New User Submission via SignUp.js
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

    // Sending reset password email
    app.post('/resetPassword', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data);
            const user = validateEmail(parsed["users"], req.body.email);
            console.log('testing if email is valid');

            if (!user[0]) {
                console.log('email address not found');
                res.sendStatus(401);
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                parsed["users"][user[1]].resetPassword = {
                    "token": token,
                    "expires": Date.now() + 360000
                };
                fs.writeFile(dataPath, JSON.stringify(parsed), 'utf8', err => {
                    if (err) {
                        throw err;
                    }
                });
                
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: `${process.env.GMAIL_ADDRESS}`,
                        pass: `${process.env.GMAIL_PASSWORD}`
                    }
                });

                const mailOptions = {
                    from: 'survivorselector@gmail.com',
                    to: `${req.body.email}`,
                    subject: 'Reset Password',
                    text:
                        `TEST TEST TEST`
                };

                transporter.sendMail(mailOptions, function(err, response) {
                    if (err) {
                        console.log('error sending email: ', err);
                    } else {
                        console.log(response);
                        console.log('reset email sent');
                        res.sendStatus(200);
                    }
                })
            }
        })
    })
    // Verifying local user token
    app.get('/verify', (req, res) => {
        const token = (req.headers.authorization);

        jwt.verify(token, PUBLIC_KEY, {format: 'PKCS8', algorithms: ['RS256']}, (err, decoded) => {
            console.log(decoded);
            if (err !== null) {
                console.log(err.message);
                throw new Error('token expired');
            } else {
                console.log('token verified');
                res.sendStatus(200);
            }
        })
    })
}

module.exports = usersRoutes;
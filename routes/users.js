require('dotenv').config();
const crypto  = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const usersRoutes = (app, fs) => {
    const dataPath = './data/users.json';

    const PRIVATE_KEY = fs.readFileSync('./jwtRS256.key');
    const PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub');

    // Find user on Login attempt
    const findUser = (users, email) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i]["email"] === email) {
                return [ users[i]["id"], i, users[i]["password"] ]
            }
        }
        return undefined;
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

    // Checking validity of reset password token
    const resetTokenValid = (users, token) => {
        let validity = [false, undefined];
        for (let i = 0; i < users.length; i++) {
            if ((users[i]["resetPassword"]["token"] === token) && (users[i]["resetPassword"]["expires"] > Date.now())) {
                console.log('reset token is valid');
                validity = [true, i];
                return validity;
            }
        }
        console.log('reset token is no longer valid');
        return validity;
    }

    // Login authentication via Login.js
    app.post('/login', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let parsed = JSON.parse(data)["users"];
            const [userId, index, hash] = findUser(parsed, req.body.email);
            
            bcrypt.compare(req.body.password, hash, function(err, result) {
                if (err) {
                    throw err;
                }
                if (result) {
                    const payload = {
                        "name": parsed[index].name,
                        "email": parsed[index].email
                    }
                    const token = jwt.sign(payload, {key: PRIVATE_KEY, passphrase: "pebble18"}, {
                        algorithm: 'RS256',
                        expiresIn: 3600,
                        subject: userId.toString()
                    });
                    res.status(200).json(token);
                } else {
                    res.sendStatus(401);
                }
            });
        });
    })

    // New User Submission via SignUp.js
    app.post('/new_user', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data);
            const status = validateNewUser(parsed["users"], req.body.username, req.body.email);

            if ((status[0] && status[1]) && (req.body.password === req.body.confirm)){
                res.status(200).send(status);
                let len = parsed.users.length;
                bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    if (err) {
                        throw err;
                    }
                    parsed.users.push({
                        "id": len+1,
                        "username": req.body.username,
                        "email": req.body.email,
                        "password": hash,
                        "resetPassword": {}
                    })
                    fs.writeFile(dataPath, JSON.stringify(parsed), 'utf-8', err => {
                        if (err) {
                            throw err;
                        }
                    })
                })
            } else {
                res.status(200).send(status);
            }
        })
    })

    // Sending reset password email
    app.post('/send_reset', (req, res) => {
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
                        'You are receiving this email because you (or someone else) have requested to reset the password associated with your account.\n\n'
                        + 'Please click on the link below for reset instructions:\n\n'
                        + `http://localhost:3000/reset/${token}\n\n`
                        + 'This link will expire in 1 hour. If you did not request this email, please ignore and your password will remain unchanged.'
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

    // Verifying reset password token
    app.get('/verify_reset', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data);
            const valid = resetTokenValid(parsed["users"], req.headers.token);
            console.log(valid);
            if (valid[0]) {
                res.status(200).send(valid);
            } else {
                res.sendStatus(401);
            }
        })
        
    })

    // Updating user password via Reset.js
    app.post('/update_password', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const parsed = JSON.parse(data);
            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) {
                    throw err;
                }
                parsed.users[req.body.user]["password"] = hash;

                fs.writeFile(dataPath, JSON.stringify(parsed), 'utf8', err => {
                    if (err) {
                        throw err;
                    }
                    res.sendStatus(200);
                });
            });
        })
    })

    // Verifying local user token
    app.get('/verify_token', (req, res) => {
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
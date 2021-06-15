const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./routes/routes.js')(app, fs);

app.listen(4000, () => {
    console.log('Server listening...')
});
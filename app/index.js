require('./telegram');
global.Promise = require('bluebird');
const express = require('express');
const config = require('./config');
const mongoDb = require('./storage');

const app = express();
const PORT = process.env.PORT || config.get('port');

const server = app.listen(PORT, () => {
    const host = '127.0.0.1';
    console.log("Example app listening at http://%s:%s", host, PORT);
});

module.exports = server;
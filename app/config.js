const nconf = require('nconf');
const ENV = process.env.NODE_ENV;

const configDev = {
    "port": 5000,
    "mongoose": {
        "uri": "mongodb://localhost/telebot",
        "options": {
            "server": {
                "socketOptions": {
                    "keepAlive": 1
                }
            }
        },
        "db": "telebot"
    },
    "telegram": {
        "token": "289831525:AAHOgpMzp2FU6nsQRcnmbgEZXoX1IOdpUrU"
    }
};

nconf.argv().env();
if (ENV == 'development') {
    nconf.defaults(configDev);
} else {
    nconf.defaults(configDev);
}

module.exports = nconf;
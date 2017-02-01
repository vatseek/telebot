const _ = require('underscore');
const TeleBot = require('telebot');
const Amount = require('./models/ballance');
const config = require('./config');

Number.prototype.format = function(length) {
    const l = this.toString().length + 2;
    let str = "  " + this.toString();
    _.each(_.range(l), () => { str += " "; });
    return str;
};

const formatTable = function(data, total) {
    let result = "\n";
    result += "  amount  |  target\n";
    result += "----------------------------------\n";
    _.each(data, (item) => {
        result += `${item.amount.format(10)} ${item.label}\n`;
    });
    result += "----------------------------------\n";
    result += `${total}\n`;

    return result;
};

const bot = new TeleBot(config.get('telegram:token'));
const send = (to, message) => {
    return bot.sendMessage(
        to,
        message,
        {
            parse: 'markdown',
            skipReport: true
        }
    );
};

const commands = {
    '/help': 'Get help',
    '/deb': 'Increase  amount [sum]',
    '/cred': 'Decrease amount [sum]',
    '/bal': 'Get balance [period]',
    '/rem': 'Get balance [id]'
};

bot.on('disconnect', () => {
    bot.connect();
});

bot.on('/help', msg => {
    let message = "```\n";
    _.each(commands, (item, index) => {
        message += `${index}: \t ${item}\n`;
    });
    message += "```";
    send(msg.from.id, message);
});

bot.on('/bal', msg => {
    let [cmd, limit] = msg.text.replace('  ', '').split(' ');
    limit = parseInt(limit);
    if (!limit) {
        limit = 20;
    }
    Amount.find().sort({created: -1}).limit(limit).then( result => {
        Amount.aggregate([{ "$group": {
            "_id": '$roomId',
            "total": { "$sum": "$amount" }
        }}]).then(sum => {
            send(msg.from.id, formatTable(result, _.first(sum).total));
        });
    });
});

bot.on('/deb', msg => {
    const command = msg.text.replace('  ', '');
    let [cmd, amount, ...label] = command.split(' ');
    const amountObj = new Amount({
        amount,
        label: label.join(' ')
    });
    amountObj.save().then((result) => {
        send(msg.from.id, `Saved ${result._id}`);
    }).catch(err => {
        send(msg.from.id, 'Some error');
    });
});

bot.on('/cred', msg => {
    const command = msg.text.replace('  ', '');
    let [cmd, amount, ...label] = command.split(' ');
    const amountObj = new Amount({
        amount: amount * -1,
        label: label.join(' ')
    });
    amountObj.save().then((result) => {
        send(msg.from.id, `Saved ${result._id}`);
    }).catch(err => {
        send(msg.from.id, 'Some error');
    });
});

bot.on('/rem', msg => {
    const command = msg.text.replace('  ', '');
    let [cmd, id] = command.split(' ');
    Amount.remove({_id: id}).then((result) => {
        send(msg.from.id, `Done`);
    }).catch(err => {
        send(msg.from.id, 'Some error');
    });
});

bot.connect();

module.exports = bot;

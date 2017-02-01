const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        'default': function () {
            return new mongoose.Types.ObjectId
        }
    },
    label: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('amount', schema);

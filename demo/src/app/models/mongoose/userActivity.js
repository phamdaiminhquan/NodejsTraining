const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActivity = new Schema({
    idUser: { type: String, maxLength: 255 },
    loginAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('userActivity', userActivity, 'userActivity');

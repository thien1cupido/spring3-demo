const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./Roles')

const Account = new Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    roles: {type: Schema.Types.ObjectId, ref: 'roles'}
});

module.exports = mongoose.model('account', Account);
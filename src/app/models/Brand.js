const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Brand = new Schema({
    name: { type: String, default: '' },
}, {
    timestamps: true
});

module.exports = mongoose.model('brands', Brand);
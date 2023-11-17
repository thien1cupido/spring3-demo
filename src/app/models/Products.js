const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
require('./Brand')


const Products = new Schema({
        name: {type: String, default: ''},
        quantity: {type: Number,required:[true,"Bac buoc nhap"]},
        price: {type: Number,required:[true,"Bac buoc nhap"]},
        image:String,
        brands: {type: Schema.Types.ObjectId, ref: 'brands'}
    },
    {
        timestamps: true
    });

// Add plugin
Products.plugin(mongooseDelete, {
    deletedAt : true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Product', Products);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaBase = require('./schema-base')

const ShoppingCart = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    ...schemaBase
});

var Model = mongoose.model('shoppingcart', ShoppingCart);
module.exports = Model;
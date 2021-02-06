const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaBase = require('./schema-base')

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    ...schemaBase
});

var Model = mongoose.model('products', ProductSchema);
module.exports = Model;
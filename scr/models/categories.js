const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaBase = require('./schema-base')

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    ...schemaBase
});

var Model = mongoose.model('categories', CategorySchema);
module.exports = Model;
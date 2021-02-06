const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schemaBase = require('./schema-base')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    shoppingcart: {
        type: Schema.Types.ObjectId,
        ref: 'shoppingcart'
    },
    ...schemaBase
});

var Model = mongoose.model('users', UserSchema);
module.exports = Model;
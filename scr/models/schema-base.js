const schemaBase = {
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    createAt: {
        type: Date,
        require: true,
        default: Date.now
    }
}

module.exports = schemaBase;
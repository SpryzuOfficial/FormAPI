const { Schema, model } = require('mongoose');

const EntrySchema = Schema({
    form: {
        type: Schema.ObjectId,
        required: true,
    },
    fields: {
        type: Array,
        required: true,
    }
});

module.exports = model('Entry', EntrySchema);
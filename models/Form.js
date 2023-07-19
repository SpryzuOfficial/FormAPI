const { Schema, model } = require('mongoose');

const FormSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    fields: {
        type: Array,
        required: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = model('Form', FormSchema);
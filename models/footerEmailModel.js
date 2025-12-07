const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const footerEmailSchema = new Schema({
    email: {type: String, default: null},
    // status: {type: Boolean, default: false},
    deleted: {type: Boolean, default: false}
}, {timestamps: true});

const footerEmailModel = new mongoose.model('footerEmail', footerEmailSchema);

module.exports = footerEmailModel;
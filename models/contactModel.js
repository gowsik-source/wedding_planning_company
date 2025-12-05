const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    firstName: { type: String, default: null },
    secondName: { type: String, default: null },
    email: { type: String, default: null },
    message: { type: String, default: null },
    status: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const contactModel = new mongoose.model('contactDetail', contactSchema);

module.exports = contactModel;
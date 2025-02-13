const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phone: String,
    email: String,
    group_ids: [String]
});

module.exports = mongoose.model('Contact', contactSchema);

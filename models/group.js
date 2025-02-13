const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    _id: String,
    name: String,
    contacts: [String]
});

module.exports = mongoose.model('Group', groupSchema);

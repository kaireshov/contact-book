const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }  
}, { timestamps: true });

module.exports = mongoose.model('group', groupSchema);
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    group_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],  
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

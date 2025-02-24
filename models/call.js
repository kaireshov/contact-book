const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    _id: String,
    caller_id: { type: String, required: true },
    callee_id: { type: String, required: true },
    call_time: { type: Date, required: true },
    duration: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Tracks owner
    callStatus: { type: String, enum: ["missed", "completed", "rejected"], default: "completed" }, // Call result
}, { timestamps: true });

module.exports = mongoose.model('Call', callSchema);

const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    _id: String,
    caller_id: String,
    callee_id: String,
    call_time: Date,
    duration: Number
});

module.exports = mongoose.model('Call', callSchema);

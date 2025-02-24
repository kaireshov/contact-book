const express = require('express');
const router = express.Router();
const Call = require('../models/call');

router.get('/', async (req, res) => {
    try {
        const calls = await Call.find();
        res.status(200).json(calls);
    } catch (error) {
        console.error("Error fetching calls:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await Call.aggregate([
            {
                $group: {
                    _id: "$caller_id",
                    total_calls: { $sum: 1 },
                    total_duration: { $sum: "$duration" }
                }
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error fetching call stats:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

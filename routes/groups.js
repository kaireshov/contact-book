const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const auth = require('../middlewares/auth');

router.post('/', auth, async (req, res) => {
    try {
        console.log("📥 Received group creation request:", req.body);

        const { name, contacts } = req.body;

        if (!name || !contacts || contacts.length === 0) {
            console.log("❌ Missing required fields");
            return res.status(400).json({ message: "Group name and at least one contact are required" });
        }

        const objectIds = contacts.map(contactId => new mongoose.Types.ObjectId(contactId));

        const group = new Group({
            name,
            contacts: objectIds,
            userId: req.user.id
        });

        await group.save();
        res.status(201).json(group);
    } catch (error) {
        console.error("❌ Error creating group:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.get('/', auth, async (req, res) => {
    try {
        console.log("📥 Fetching groups for user:", req.user.id);

        const groups = await Group.find({ userId: req.user.id }).populate({
            path: 'contacts',
            select: 'name'
        });

        res.json(groups);
    } catch (error) {
        console.error("❌ Error fetching groups:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.put('/:group_id/add-contact/:contact_id', async (req, res) => {
    try {
        const { group_id, contact_id } = req.params;

        await Group.updateOne(
            { _id: group_id },
            { $addToSet: { contacts: contact_id } }
        );

        await Contact.updateOne(
            { _id: contact_id },
            { $addToSet: { group_ids: group_id } }
        );

        res.send({ message: 'Contact added to group' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:group_id/remove-contact/:contact_id', async (req, res) => {
    try {
        const { group_id, contact_id } = req.params;

        await Group.updateOne(
            { _id: group_id },
            { $pull: { contacts: contact_id } }
        );

        await Contact.updateOne(
            { _id: contact_id },
            { $pull: { group_ids: group_id } }
        );

        res.send({ message: 'Contact removed from group' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await Group.aggregate([
            { 
                $project: { 
                    _id: 1, 
                    name: 1, 
                    contact_count: { $size: "$contacts" } 
                } 
            }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error fetching group stats:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

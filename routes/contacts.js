const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

router.get('/', auth, async (req, res) => {
    try {
        console.log("👤 Fetching contacts for user:", req.user.id);

        const contacts = await Contact.find({ userId: req.user.id });
        res.json(contacts);
    } catch (error) {
        console.error("❌ Error fetching contacts:", error);
        res.status(500).json({ message: "Server error", error });
    }
});



router.put('/bulk-update', async (req, res) => {
    try {
        const { group_id, newEmailDomain } = req.body;

        await Contact.updateMany(
            { group_ids: group_id },
            { $set: { email: { $concat: ["$name", newEmailDomain] } } }
        );

        res.send({ message: 'Contacts updated successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', auth, async (req, res) => {
    try {
        console.log("📥 Received contact creation request:", req.body);

        const { name, phone, email, group_ids } = req.body; 

        const contact = new Contact({
            name,
            phone,
            email,
            group_ids,
            userId: req.user.id 
        });

        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        console.error("❌ Error adding contact:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const contact = await Contact.findOne({ _id: req.params.id, userId: req.user.id });

        if (!contact) {
            console.log("❌ Contact not found or not owned by user:", req.user.id);
            return res.status(404).json({ message: "Contact not found" });
        }

        await contact.deleteOne();
        res.json({ message: "✅ Contact deleted" });
    } catch (error) {
        console.error("❌ Error deleting contact:", error);
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;

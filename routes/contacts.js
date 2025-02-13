const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// 🔹 Получение контактов с фильтрацией, пагинацией и сортировкой
router.get('/', async (req, res) => {
    try {
        const { name, email, page = 1, limit = 10, sort = "name" } = req.query;

        const filter = {};
        if (name) filter.name = new RegExp(name, "i"); // Фильтрация по имени (регистронезависимо)
        if (email) filter.email = new RegExp(email, "i"); // Фильтрация по email

        const contacts = await Contact.find(filter)
            .sort({ [sort]: 1 }) // Сортировка по имени (по умолчанию)
            .skip((page - 1) * limit) // Пагинация
            .limit(Number(limit));

        res.status(200).json(contacts); // Отправляем JSON вместо res.send()
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

router.post('/', async (req, res) => {
    try {
        const { _id, name, phone, email, group_ids } = req.body;

        if (!_id || !name || !phone || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const contact = new Contact({ _id, name, phone, email, group_ids });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        console.error("Error adding contact:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Массовое обновление email контактов
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

// 🔹 Массовое удаление контактов
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

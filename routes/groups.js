const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Contact = require('../models/contact');

// 🔹 Добавление контакта в группу
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

// 🔹 Удаление контакта из группы
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

// 🔹 Подсчет контактов в группах
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error("Error fetching groups:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

// 🔹 Статистика по группам (количество контактов в каждой группе)
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


// 🔹 Создание группы по существующим контактам
router.post('/create-from-contacts', async (req, res) => {
    try {
        const { name, contact_ids } = req.body;

        // Проверяем, переданы ли данные
        if (!name || !Array.isArray(contact_ids) || contact_ids.length === 0) {
            return res.status(400).json({ message: "Missing group name or contact IDs" });
        }

        // Проверяем, существуют ли контакты
        const existingContacts = await Contact.find({ _id: { $in: contact_ids } });
        if (existingContacts.length !== contact_ids.length) {
            return res.status(404).json({ message: "Some contacts not found", foundContacts: existingContacts });
        }

        // Генерируем уникальный ID для группы
        const groupId = `g${Date.now()}`;

        // Создаём новую группу
        const newGroup = new Group({ _id: groupId, name, contacts: contact_ids });
        await newGroup.save();

        // Обновляем контакты, добавляя им ID новой группы
        await Contact.updateMany(
            { _id: { $in: contact_ids } },
            { $addToSet: { group_ids: groupId } }
        );

        res.status(201).json(newGroup);
    } catch (error) {
        console.error("Error creating group:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./routes/contacts');
const groupRoutes = require('./routes/groups');
const callRoutes = require('./routes/calls');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // 📌 Раздаём HTML и CSS

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use('/contacts', contactRoutes);
app.use('/groups', groupRoutes);
app.use('/calls', callRoutes);

// 📌 Отдаём index.html для фронтенда
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

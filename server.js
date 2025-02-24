require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const contactRoutes = require('./routes/contacts');
const groupRoutes = require('./routes/groups');
const callRoutes = require('./routes/calls');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.static('public')); 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.use('/contacts', contactRoutes);
app.use('/groups', groupRoutes);
app.use('/calls', callRoutes);
app.use('/auth', authRoutes);

app.get('/api/some-endpoint', (req, res) => {
    res.json({ message: "API работает!" });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

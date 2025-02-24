const express = require('express');
const router = express.Router();
const User = require('../models/user');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../middlewares/validate');


// 🔹 Register a new user
router.post('/register', validateUser, async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// 🔹 Login user
router.post('/login', async (req, res) => {
    try {
        console.log("Login request received:", req.body);

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Incorrect password for:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        

        console.log("User logged in successfully:", user.email);
        res.json({ token });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;

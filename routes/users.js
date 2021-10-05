const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users
router.get("/", (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Get one user
router.get("/:id", getUser, (req, res, next) => {
    res.send(res.user.name);
});

// Create User

// Update User

// Delete User

async function getUser(res, req, next) {
    let user;
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Cannot find the user" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

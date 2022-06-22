const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users
router.get("/", async (req, res, next) => {
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
router.post("/", async (req, res) => {
    const user = new User({
        username: req.body.name,
        name: req.body.name,
        birthDate: req.body.birthDate,
        identityNumber: req.body.identityNumber,
        phone: req.body.phone,
        address: req.body.address,
        website: req.body.website,
        following: req.body.following,
        followers: req.body.followers
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.log("olmadı ", error)
        res.status(400).json({ message: error.message });
    }
});

// Update User
router.patch("/:id", getUser, async (req, res) => {
    if (req.body.username != null) {
        req.user.username = req.body.username;
    }
    if (req.body.name != null) {
        req.user.name = req.body.name;
    }
    if (req.body.birthDate != null) {
        req.user.birthDate = req.body.birthDate;
    }
    if (req.body.identityNumber != null) {
        req.user.identityNumber = req.body.identityNumber;
    }
    if (req.body.phone != null) {
        req.user.phone = req.body.phone;
    }
    if (req.body.address != null) {
        req.user.address = req.body.address;
    }
    if (req.body.website != null) {
        req.user.website = req.body.website;
    }
    if (req.body.following != null) {
        req.user.following = req.body.following;
    }
    if (req.body.followers != null) {
        req.user.followers = req.body.followers;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User
router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.remove();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

module.exports = router
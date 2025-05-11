const express = require('express');
const mongoose = require('mongoose');
const Users = require("./models/users.model");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route for the home page
app.get('/', (req, res) => {
    res.send("Halo bang");
});

// Route to get all users
app.get("/api/Users", async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to create a new user
app.post("/api/Users", async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Connect to MongoDB
mongoose.connect("mongodv     b://localhost:27017/")
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.log("Connection Failed:", error);
    });

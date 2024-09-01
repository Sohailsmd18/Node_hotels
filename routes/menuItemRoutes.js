const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem'); // Correctly import the MenuItem model

router.post('/MenuItem', async function(req, res) {
    try {
        const data = req.body; // Assuming the request body contains the necessary data
        
        // Create a new MenuItem document using the Mongoose model
        const newMenuItem = new MenuItem(data);
        
        // Save the MenuItem document and wait for the operation to complete
        const savedMenuItem = await newMenuItem.save();
        
        console.log("Data saved successfully");
        res.status(200).json(savedMenuItem);
    } catch (error) {
        console.log("Error saving MenuItem", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get all MenuItems
router.get('/MenuItem', async function(req, res) {
    try {
        const data = await MenuItem.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

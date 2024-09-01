const express = require('express');  // Corrected to require express, not mongoose
const router = express.Router();  // Corrected to use Router with a capital 'R'
const Person = require('./../models/Person');

// POST route to add person
router.post('/Person', async function(req, res) {
    try {
        const data = req.body; // Assuming the request body contains the necessary data
        
        // Create a new person document using the Mongoose model
        const newPerson = new Person(data);
        
        // Save the person document and wait for the operation to complete
        const savedPerson = await newPerson.save();
        
        console.log("Data saved successfully");
        res.status(200).json(savedPerson);
    } catch (error) {
        console.log("Error saving person", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get all persons
router.get('/Person', async function(req, res) {
    try {
        const data = await Person.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET method to get a person by work type
router.get('/Person/:workType', async (req, res) => {
    const workType = req.params.workType; // extracting workType from the URL parameter
    try {
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log("Response fetched");
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid workType' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPerson = req.body;
        
        const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        });
        
        if (!response) {
            return res.status(404).json({ error: "Person not found" });
        }
        
        console.log("Data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//exporting this code
module.exports = router;

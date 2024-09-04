const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

// POST route to add person
router.post('/signup', async function (req, res) {
    try {
        const data = req.body; // Assuming the request body contains the necessary data

        // Create a new person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the person document and wait for the operation to complete
        const savedPerson = await newPerson.save();

        console.log("Data saved successfully");

        const payload = {
            id: savedPerson._id,  // Corrected to use savedPerson
            username: savedPerson.username
        };

        console.log(JSON.stringify(payload));
        const token = generateToken({ username: savedPerson.username }); // Correct token generation

        console.log("Token is:", token);
        res.status(200).json({ response: savedPerson, token: token }); // Correct response object
    } catch (error) {
        console.log("Error saving person", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get all persons
router.get('/Person', async function (req, res) {
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

router.post('/login',async (req,res)=>{
    try{
        //Extract user name body from the request body
        const{username,password}=req.body;
        //Find the user by username
        const user=await Person.findOne({username:username});

    //If user or password doesnt match return error
    if(!user||!(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or password'});
    }
    //Generate token
    const payload={
        id:user.id,
        username:user.username
    }
    const token =generateToken(payload);
    //return token as response
    res.json({token});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
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

// exporting this code
module.exports = router;

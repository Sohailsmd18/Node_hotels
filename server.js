const express = require('express');
const app = express();
const db = require('./db'); // Assuming you have a database connection setup in db.js
require('dotenv').config();

const Person = require('./models/Person'); // Assuming you have a Mongoose model for Person
const passport=require('./auth');
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

// Middleware Function to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // Move on to the next middleware or route handler
};

app.use(logRequest);



// Initialize Passport
app.use(passport.initialize());

// Route for POST authentication
const localAuthMiddleware=passport.authenticate('local', { session: false })
app.post('/',localAuthMiddleware , function (req, res) {
    res.send('Welcome to our Hotel');
});

// Route for GET authentication (not recommended for production use)
app.get('/', async (req, res) => {
    const { username, password } = req.query;
    try {
        const user = await Person.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        res.send('Welcome to our Hotel');
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Uncommented callback method for Person creation
// app.post('/Person', function(req, res) {
//     const data = req.body;
//     const newPerson = new Person(data);
//     newPerson.save((error, savedPerson) => {
//         if (error) {
//             console.log("Error saving person", error);
//             res.status(500).json({ error: 'Internal server error' });
//         } else {
//             console.log("Data saved successfully");
//             res.status(200).json(savedPerson);
//         }
//     });
// });

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/', personRoutes);
app.use('/', menuItemRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Error Handling Middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON');
        return res.status(400).send({ error: 'Invalid JSON' });
    }
    next();
});

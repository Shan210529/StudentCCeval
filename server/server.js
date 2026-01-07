
const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;
// Use Environment Variable for DB Connection (Critical for Render)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student_db';

// Middleware
app.use(cors());
app.use(express.json());

// Serve Static Files (The React App)
app.use(express.static(path.join(__dirname, '../client/dist')));

// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// API Routes
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, dob, gender, course, address } = req.body;

        if (!firstName || !lastName || !email || !course) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newStudent = new Student({
            firstName, lastName, email, phone, dob, gender, course, address
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully', student: newStudent });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Catch-all handler: Send React's index.html for any other route
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Connecting to local Compass instance (default port 27017)
mongoose.connect('mongodb://127.0.0.1:27017/student_db')
    .then(() => console.log('Connected to MongoDB Successfully'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, dob, gender, course, address } = req.body;

        // Basic server-side validation
        if (!firstName || !lastName || !email || !course) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newStudent = new Student({
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            course,
            address
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

app.get('/', (req, res) => {
    res.send('Student Registration API is running.');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

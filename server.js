const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path"); // Import the path module

const app = express();
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Connect to MongoDB
mongoose.connect("mongodb+srv://purvasha1013:Imp_560062@sit-725.b8fxacb.mongodb.net/?retryWrites=true&w=majority&appName=deakin", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema for cards
const cardSchema = new mongoose.Schema({
    title: String,
    color: String,
    image: String,
    description: String
});
const Card = mongoose.model('Card', cardSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Form submission
app.post('/api/cards', async (req, res) => {
    try {
        const { title, color, image, description } = req.body;
        const newCard = new Card({ title, color, image, description });
        await newCard.save();
        res.status(201).json({ message: 'Card added successfully' });
    } catch (err) {
        console.error('Error adding card:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET request to fetch all cards
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        console.error('Error fetching cards:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

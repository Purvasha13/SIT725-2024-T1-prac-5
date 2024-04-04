
const express = require("express");
const app = express();
const path = require("path"); // Import the path module

const mongoose = require("mongoose");

const dburl = "mongodb+srv://purvasha1013:Imp_560062@sit-725.b8fxacb.mongodb.net/";

const conParam = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Card data
const cardList = [
    {
        title: "puppy",
        image: "image/download.jpeg",
        link: "About Me",
        description: "I am a puppy !!"
    }
 ];

// Insert cards into the MongoDB collection
async function addCardsToMongoDB() {
    try {
        // Insert each card data into the collection
        await Card.insertMany(cardList);
        console.log('Cards added to MongoDB');
    } catch (error) {
        console.error('Error adding cards to MongoDB:', error);
    }
}

// Card Schema
const cardSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String
});

// Create Card model
const Card = mongoose.model('Card', cardSchema);

mongoose.connect(dburl, conParam)
    .then(() => {
        console.info("Connected to the DB");
    })
    .catch((e) => {
        console.log("Error:", e);
    });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname)));

// Define route to fetch card details
app.get('/api/cards', async (req, res) => {
    try {
        // Fetch all cards from MongoDB
        const cards = await Card.find({});
        res.json(cards); // Return fetched cards as JSON response
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define route handler for the root URL
app.get('/', (req, res) => {
    // Send the HTML file when accessing the root URL
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App running on port " + port);
});

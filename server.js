const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cardRoutes = require('./routes/index');

const app = express();

mongoose.connect('mongodb+srv://purvasha1013:Imp_560062@sit-725.b8fxacb.mongodb.net/?retryWrites=true&w=majority&appName=SIT-725');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname)));

app.use('/', cardRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

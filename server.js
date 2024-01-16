const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
//const manager = require('./data-service')
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json())
app.use(express.json())
//manager.initialize();

//mongodb+srv://danilovityk:S7qNHZlqCKpRsRod@web422.k0u1pig.mongodb.net/?retryWrites=true&w=majority

app.get('/', (req, res) =>
{
    res.json({message: "API Listening"})
});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 2999;

const app = express();

const str = `port ${PORT}`;

mongoose.connect('mongodb://localhost/playersDB', { useNewUrlParser: true, useUnifiedTopology: true });

const playerSchema = new mongoose.Schema({
    name: String,
    password: String,
    score: Number
});

const Player = mongoose.model('Player', playerSchema);

app.use(cors()); // Используйте пакет cors

app.use(express.json());
app.get('/api/get', (req, res) => {
    res.json({
        message1: "hello server",
        message2: str
    })
})

app.get('/api/getdb', (req, res) => {
    const players = Player.find();
    res.json(players)
})

app.post('/api/endpoint', (req, res) => {
    console.log(req.body.message3);
    res.status(200).end();
})

app.post('/api/create', (req, res) => {
    const newPlayer = new Player(req.body).save();
    res.status(200).end();
})

app.listen(PORT, () => {
    console.log('server start, port '+ PORT)
})


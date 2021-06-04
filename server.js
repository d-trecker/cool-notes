const express =  require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const savedNotes = require("./db/notes.json");

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//GET request to render public HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public.html'));
});
//GET request to render notes HTML
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
//GET request for notes in DB. 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/db/notes.json"));
});

// app.get('/api/db', (req, res) => {
//     res.json(savedNotes);
// });

//Listen request
app.listen(PORT, () => {
    console.log(`API server is now on ${PORT}!`);
});
const express =  require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// app.get('/api/db', (req, res) => {
//     res.json(notes);
// });

app.listen(3001, () => {
    console.log('API server now on port 3001');
});
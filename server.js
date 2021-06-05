const { nanoid } = require('nanoid');
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

app.post('/api/notes', (req, res) => {
    const writeNote = req.body;
    const savedNotes = JSON.parse(fs.readFileSync('./db/notes.json'));
    writeNote.id = nanoid(10);
    if (!req.body) {
        res.status(400).send('The note is not properly formatted')
    } else {
    savedNotes.push(writeNote);
    fs.writeFileSync('./db/notes.json', JSON.stringify(savedNotes));
    res.json(savedNotes);
    }
});

//Listen request
app.listen(PORT, () => {
    console.log(`API server is now on ${PORT}!`);
    // console.log(nanoid(10));
});
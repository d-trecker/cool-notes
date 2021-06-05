const { nanoid } = require('nanoid');
const express =  require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;


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

//Post request to add notes.
app.post('/api/notes', (req, res) => {
    const writeNote = req.body;
    const savedNotes = JSON.parse(fs.readFileSync('./db/notes.json'));
    //nanoid creates unique id to add to new note. 
    writeNote.id = nanoid(10);
    savedNotes.push(writeNote);
    fs.writeFileSync('./db/notes.json', JSON.stringify(savedNotes));
    res.json(savedNotes);
});

//Delete note request
app.delete('/api/notes/:id', (req, res) => {
    const savedNotes = JSON.parse(fs.readFileSync('./db/notes.json'));
    const deleteNote = savedNotes.filter((trashNote) => trashNote.id !== req.params.id);
    fs.writeFileSync('./db/notes.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
})

//Listen request
app.listen(PORT, () => {
    console.log(`API server is now on ${PORT}!`);
});
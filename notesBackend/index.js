import cors from 'cors';
import express from 'express';
import { PORT } from './config.js';

import { Note } from './models/note.js';

let notes = [
  { 
    "id": 1, 
    "content": "HTML is easy", 
    "important": true },
  {
    "id": 2,
    "content": "Browser can execute only JavaScript",
    "important": false
  },
  {
    "id": 3,
    "content": "GET and POST are the most important methods of HTTP protocol",
    "important": true
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('---');
  next();
};

const app = express();
app.use(express.json());
//Necesario para servir el index.html y index.js al desplegarlo
app.use(express.static('dist')); 
app.use(requestLogger);
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/v1/notes/:id', (req, res) => {
    const note = notes.find(note => note.id === Number(req.params.id));

    if(isNaN(req.params.id)) return res.status(400).json({error: "The id must be a number."});
    if(!note) return res.status(404).json({error: 'Resource not found.'});
    
    res.json(note);
});

app.get('/api/v1/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes));
});

app.post('/api/v1/notes', (req, res) => {
  if(!req.body) return res.status(422).json({error: "The body is missing."});

  const note = new Note({
    content: req.body.content,
    important: req.body.important
  });

  note.save().then(savedNote => {
    res.json(savedNote);
  });

});

app.delete('/api/v1/notes/:id', (req, res) => {
    const noteIndex = notes.findIndex(note => note.id === Number(req.params.id));

    if(isNaN(req.params.id)) return res.status(400).json({error: "The id must be a number."});
    if(noteIndex === -1) return res.status(404).json({error: 'Resource not found.'});

    notes.splice(noteIndex, 1);

    res.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}




app.use(unknownEndpoint)

app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port:${PORT}`));
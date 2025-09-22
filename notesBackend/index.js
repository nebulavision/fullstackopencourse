import cors from 'cors';
import express from 'express';
import { PORT } from './config.js';

import { Note } from './models/note.js';

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

app.get('/api/v1/notes', (req, res) => {
  Note.find({}).then(notes => res.json(notes));
});

app.get('/api/v1/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({error: 'Resource not found.'});
      }
    })
    .catch(error => next(error));
});

app.post('/api/v1/notes', (req, res, next) => {
  const note = new Note({
    content: req.body.content,
    important: req.body.important
  });

  note.save().then(savedNote => {
    res.json(savedNote);
  })
  .catch(error => next(error));

});

app.put('/api/v1/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  // {new: true} es para que en el param devuelto en la promesa
  // en este caso updatedNote sea el objeto actualizado y no el original
  Note.findByIdAndUpdate(
    req.params.id, 
    { content, important }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      res.json(updatedNote);
    })
    .catch(error => next(error));
});

app.delete('/api/v1/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
};

const errorHandler = (error, req, res, next) => {
  console.error('Error', error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(422).json({ error: error.message });
  }

  next(error);
};



app.use(unknownEndpoint);
// Este debe ser el último middleware cargado
app.use(errorHandler); 

app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port:${PORT}`));
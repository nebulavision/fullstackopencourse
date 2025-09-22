import express from "express";
import { Note } from "../models/note.js";

const notesRouter = express.Router();

notesRouter.get("/", (request, response) => {
  Note.find({}).then((notes) => response.json(notes));
});

notesRouter.get("/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).json({ error: "Resource not found." });
      }
    })
    .catch((error) => next(error));
});

notesRouter.post("/", (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.important,
  });

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((error) => next(error));
});

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body;

  // {new: true} es para que en el param devuelto en la promesa
  // en este caso updatedNote sea el objeto actualizado y no el original
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

export default notesRouter;

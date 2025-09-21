import { useState, useEffect } from "react";

import "./styles/index.css";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/noteService";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("A new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("A error has ocurred");
  const [notificationDisplayed, setNotificationDisplayed] = useState(false);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const toogleImportance = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch(() => {
        setErrorMessage(`The note ${note.content} was already deleted from server.`);
        setNotificationDisplayed(true);

        setTimeout(() => {
          setErrorMessage(null);
          setNotificationDisplayed(false);
        }, 5000);
        
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const handleNotificacionClose = () => {
    setNotificationDisplayed(!setNotificationDisplayed);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification
        message={errorMessage}
        isDisplayed={notificationDisplayed}
        handleClose={handleNotificacionClose}
      />
        <button type="button" onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toogleImportance={() => toogleImportance(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <label htmlFor="noteText">Enter a new note:</label>
        <input id='noteText' type='text' value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>
  );
};

export default App;

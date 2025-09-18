import { useState, useEffect } from "react";
import noteService from "./services/noteService";

const Filter = ({ handleNewFilter }) => (
  <div>
    Filter shown with <input type="text" onChange={handleNewFilter} />
  </div>
);

const PersonForm = ({
  handleClick,
  handleNewName,
  handleNewNumber,
  newName,
  newNumber,
}) => (
  <form>
    <div>
      Name: <input type="text" onChange={handleNewName} value={newName} />
    </div>
    <div>
      Number: <input type="text" onChange={handleNewNumber} value={newNumber} />
    </div>
    <div>
      <button type="submit" onClick={handleClick}>
        Add
      </button>
    </div>
  </form>
);

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p style={{ display: "inline", marginRight: "10px" }}>
            {person.name} {person.number}
          </p>
          <button onClick={() => onDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    noteService.getAll().then((notes) => {
      setPersons(notes);
    });
  }, []);

  const handleDeleteClick = (noteId) => {
    const numberToDelete = persons.find((p) => p.id === noteId);
    console.log(noteId);
    if (!window.confirm(`Are you sure you want to delete ${numberToDelete.name}?`)) return;

    noteService.deleteNumber(noteId).then(() => {
      setPersons(persons.filter((p) => p.id !== noteId));
      });
  };

  const handleClick = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("Please fill in both name and number");
      return;
    }

    if (persons.find((p) => p.name === newName)) {
      if(!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;
      const personToUpdate = persons.find((p) => p.name === newName);
      const updatedPerson = { ...personToUpdate, number: newNumber };

      noteService.updateNumber(personToUpdate.id, updatedPerson).then(returnedPerson => {
        setPersons(
          persons.map((p) => (p.id !== personToUpdate.id ? p : returnedPerson))
        );
        setNewName("");
        setNewNumber("");
      }).catch(() => {
        alert(`Information of ${newName} has already been removed from server`);
        setPersons(persons.filter(p => p.id !== personToUpdate.id));
      }); 
      
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${persons.reduce((maxId, person) => Math.max(maxId, person.id), 0) + 1}`
    };

    noteService.insertNumber(newPerson).then((insertedNumber) => {
      setPersons(persons.concat(insertedNumber));
      setNewName("");
      setNewNumber("");
    });
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  if (filteredPersons.length === 0)
    filteredPersons.push({ id: 0, name: "No matches found", number: "" });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNewFilter={(e) => setFilterQuery(e.target.value)} />
      <br />
      <br />
      <h3>Add a new</h3>
      <PersonForm
        handleClick={handleClick}
        handleNewName={(e) => setNewName(e.target.value)}
        handleNewNumber={(e) => setNewNumber(e.target.value)}
        newName={newName}
        newNumber={newNumber}
      />
      <br />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={(noteId) => handleDeleteClick(noteId)}/>
    </div>
  );
};

export default App;

import { useState } from "react";

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

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    if (persons.find((p) => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      if (persons.length === filteredPersons.length) {
        setFilteredPersons(filteredPersons.concat(newPerson));
      }

      setPersons(persons.concat(newPerson));
    }

    setNewName("");
  };

  const handleNewFilter = (event) => {
    const newFilter = event.target.value;
    const filteredPersons = persons.filter((p) =>
      p.name.toLowerCase().includes(newFilter.toLowerCase())
    );
    setFilteredPersons(filteredPersons ? filteredPersons : persons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleNewFilter={handleNewFilter} />
      <br />
      <br />
      <h3>Add a new</h3>
      <PersonForm
        handleClick={handleClick}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <br />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

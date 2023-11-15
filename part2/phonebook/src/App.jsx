import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (
      !persons.reduce((prev, curr) => {
        return prev || curr.name == newName;
      }, false)
    ) {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} already exists`);
    }
  };

  const handleSearch = (event) => {
    const current = event.target.value.toLowerCase();
    setSearch(current);
  };
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );
  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} onChange={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with:{" "}
      <input value={props.search} onChange={props.onChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleName} />
      </div>
      <div>
        phoneNumber:{" "}
        <input value={props.newNumber} onChange={props.handleNumber} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default App;

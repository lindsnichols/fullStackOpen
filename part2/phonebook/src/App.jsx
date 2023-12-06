import { useState, useEffect } from "react";
import service from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({});

  const effect = () => {
    service.getAll().then((response) => {
      setPersons(response);
    });
  };
  useEffect(effect, []);

  const setNotif = (message, type) => {
    const notif = {
      message,
      type,
    };
    setNotification(notif);
    setTimeout(() => {
      setNotification({});
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    const nameIndexExists = persons.reduce((prev, curr, currIndex, array) => {
      return curr.name == newName ? array[currIndex].id : prev;
    }, -1);
    console.log(nameIndexExists);
    if (nameIndexExists < 0) {
      service.create(nameObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setNotif(`${response.name} added`, "confirm");
      });
    } else {
      const shouldReplace = window.confirm(
        `${newName} already added, replace?`
      );
      if (shouldReplace) {
        service
          .update(nameIndexExists, nameObject)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== nameIndexExists ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setNotif(`${response.name} updated`, "confirm");
          })
          .catch((response) => {
            setNotif(`${newName} already removed from server`, "error");
          });
      }
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
  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name}`)) {
      service.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setNotif(`${name} deleted`, "confirm");
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
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
      <Persons persons={personsToShow} removePerson={removePerson} />
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
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.removePerson(person.name, person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default App;

import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import jsonService from "./services/jsonService";
import Notification from "./components/Notification";

const App = () => {
  //state variables
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterWith, setFilterWith] = useState("");
  const [notification, setNotification] = useState(null);

  const filteredPersons = persons.filter((person) =>
    person.name.includes(filterWith)
  );

  //useEffect hook to fetch initial json data
  useEffect(() => {
    jsonService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((reason) => alert(`Error: ${reason}`));
  }, []);

  //utility fn to display notification for 5 seconds
  const displayNotification = (classname, message) => {
    setNotification({
      className: classname,
      message: message,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  //event handlers
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterWith(event.target.value);

  const addNewPerson = (event) => {
    event.preventDefault();
    //if the person already exists, update number
    if (persons.find((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        const person = persons.find((person) => person.name === newName);
        const updatedPerson = { ...person, number: newNumber };
        setPersons(
          persons.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
        );

        jsonService.update(updatedPerson).catch((error) => {
          displayNotification(
            "error-msg",
            `Information of ${newName} has already been removed from the server`
          );
          console.log(error);
          jsonService.getAll().then((data) => {
            setPersons(data);
          });
        });
        displayNotification("success-msg", `New number updated for ${newName}`);
      }
    } else {
      //if person doesnt already exist, create new person obj
      const newPerson = { name: newName, number: newNumber };

      jsonService
        .create(newPerson)
        .then((data) => {
          setPersons(persons.concat(data));
          displayNotification("success-msg", `${newName} added to phonebook`);
        })
        .catch((reason) => alert(`Error: ${reason}`));
    }
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (name) => {
    // Delete record of the person
    if (window.confirm(`Delete ${name}?`)) {
      const id = persons.find((person) => person.name === name).id;
      jsonService.remove(id).catch((reason) => {
        displayNotification(
          "error-msg",
          `Information of ${name} has already been removed from the server`
        );
        jsonService.getAll().then((data) => {
          setPersons(data);
        });
      });
      setPersons(persons.filter((person) => person.name !== name));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}></Notification>
      <Filter
        filterWith={filterWith}
        handleFilterChange={handleFilterChange}
      ></Filter>

      <h2>add a new</h2>
      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      ></PersonForm>

      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react'
import './App.css'
import contactService from "./services/contacts"


const Filter = ({ handleFilter }) => {
  return (
    <div>
      Search Phonebook by Name: <input onChange={handleFilter} />
    </div>
  );
};

const ContactForm = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Numbers = ({ filteredList, deletePerson }) => {
  console.log(filteredList);

  return (
    <div>
      <ul>
        {filteredList.map((person) => (
          <li>
            {person.name} - {person.number} 
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Please enter your name");
  const [newNumber, setNewNumber] = useState("Please enter your number");
  const [filterValue, setFilterValue] = useState();

  useEffect(() => {
    contactService.getContacts().then((contacts) => setPersons(contacts));
  }, []);

  const filteredList = !filterValue
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterValue.toLowerCase())
      );

  const addPerson = (event) => {
    event.preventDefault();
    const nameCheck = (person) => person.name !== newName;

    if (persons.every(nameCheck)) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };

      contactService.addContact(nameObject).then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewName("")
        setNewNumber("")
      });
    } else {
      alert(`The name '${newName}' is already in use. Please change.`);
    }
  };

  const deletePerson = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?')

    if(confirmed){
      contactService.deleteContact(id).then(response => console.log('Deleted', response.data))
      setNewName("")
      setNewNumber("")
    } else {
      console.log('Deletion has been cancelled by user.')
    } 
  }

  //Event Handler Functions
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={handleFilterChange} />

      <h2>Add a Contact</h2>
      <ContactForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Contact List</h2>
      <Numbers filteredList= {filteredList} deletePerson = {deletePerson} />
    </div>
  );
};

export default App;

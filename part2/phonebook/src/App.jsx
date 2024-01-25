import { useState, useEffect } from 'react'
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
    <div className='addContact'>
      <h2>Add a Contact</h2>
      <form className='contactForm' onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} placeholder='Enter the Name'/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} placeholder='Enter the Phone Number'/>
        </div>
        <div>
          <button className='contactButton' type="submit">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

const Numbers = ({ filteredList, deletePerson }) => {
  console.log(filteredList);

  return (
    <div className='contactList'>
      <h2>Contact List</h2>
      <ul>
        {filteredList.map((person) => (
          <li className='contactItem'>
            <span>{person.name} - {person.number}</span> 
            <button className='deleteButton' onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notifications = ({message}) => {
  if(message === null) {
    return null
  }
    
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <div className='fail'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState();
  const [newNumber, setNewNumber] = useState();
  const [filterValue, setFilterValue] = useState();
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      }

      contactService.addContact(nameObject).then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewName("")
        setNewNumber("")
      })
      .then(success => {
        setSuccessMessage(`${nameObject.name} has been added to your contacts`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 6000)
      })
    } else {

      const confirmed = window.confirm(`${newName} already exists in your contacts. Do you wish to change their number?`)
      
      if(confirmed){
        const newPersons = [...persons]
        const contact = newPersons.find(person => person.name === newName)
        const contactId = contact.id;
        const changedContact = { ...contact, number: newNumber }

        contactService.updateContact(contactId, changedContact)
        .then(returnedContact => {
          setPersons(newPersons.map(person => person.id !== id ? person : returnedContact))
        })
        .catch(error => {
          setErrorMessage(`This person has already been deleted.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
        })
      }
    }
  };

  const deletePerson = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this contact?')
    
    if(confirmed){
      contactService.deleteContact(id).then(response => {
        console.log('Deleted', response.data)
        setState()
      })
    
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
    <div className='container'>
      <h1 className='mainHead'>Phonebook</h1>
      <Filter handleFilter={handleFilterChange} />

      
      <ContactForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <Notifications message={successMessage}/>
      <ErrorMessage message={errorMessage}/>
      <Numbers filteredList= {filteredList} deletePerson = {deletePerson}/>
    </div>
  );
};

export default App;

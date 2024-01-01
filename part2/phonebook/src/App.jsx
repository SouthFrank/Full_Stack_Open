import { useState } from 'react'
import './App.css'

const Person = ({name, number}) => {
  return (
    <li>{name} - {number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('Please enter your name')
  const [newNumber, setNewNumber] = useState('Please enter your number')
  const [filterValue, setFilterValue] = useState()

  const filteredList = !filterValue ? persons : persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const nameCheck = (person) => person.name !== newName

    if(persons.every(nameCheck)){
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
  
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`The name '${newName}' is already in use. Please change.`)
    }

    
    console.log(persons)
  }


  //Event Handler Functions
  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const handleFilterChange = event => setFilterValue(event.target.value)
  

  return (
    <div>
      <h1>Phonebook</h1>
      <form onChange={handleFilterChange}>
        <div>
          Search Phonebook by Name: <input />
        </div>
      </form>

      <h2>Add a Contact</h2>
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

      <h2>Contact List</h2>
      <div>  
        <ul>
          {filteredList.map(person => 
            <Person key={person.id} name={person.name} number={person.number} />
          )} 
        </ul>      
      </div>
    </div>
  )
}

export default App

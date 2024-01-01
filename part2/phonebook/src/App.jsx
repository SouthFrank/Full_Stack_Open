import { useState } from 'react'
import './App.css'

const Person = ({name}) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('Frank')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log(persons)
  }

  const handleNameChange = event => setNewName(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>  
        <ul>
          {persons.map(person => 
            <Person key={person.id} name={person.name}/>
          )} 
        </ul>      
      </div>
    </div>
  )
}

export default App

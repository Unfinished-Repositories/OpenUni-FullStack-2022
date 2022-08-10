import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({value, onChange}) =>
  <div>
    filter shown with
    <input
      value={value}
      onChange={onChange}
    />
  </div>

const PersonForm = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) =>
      <form onSubmit={onSubmit}>
        <div>
          name:
            <input
              value={nameValue}
              onChange={nameOnChange}
            />
        </div>
        <div>
          number:
          <input
          value={numberValue}
          onChange={numberOnChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

const Persons = ({persons, nameFilter, deletePerson}) => {
  let personsToShow = persons
  if (nameFilter !== '') {
    personsToShow = persons.filter(
      person => person.name.toLowerCase().includes(nameFilter)
    )
  }
  return <table>
    <tbody>
      {
        personsToShow.map(person =>
        <Person key={person.name} person={person} deletePerson={deletePerson}/>
      )}
    </tbody>
  </table>
}

const Person = ({person, deletePerson}) =>
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><DeleteButton onClick={() => deletePerson(person)} /></td>
  </tr>

const DeleteButton = ({onClick}) => <button onClick={onClick}>delete</button>

const Notification = ({ message, positive }) => {
  if (message === null) { return null }
  const notificationStyle = {
    color: positive? 'green': 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  return <div style={notificationStyle}>{message}</div>
}

const App = () => {
  const emptyNotification = {message: null, positive: true}
  const notificationTime = 3000

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(emptyNotification)

  const handleNewNameChange = (event) => setNewName(event.target.value)
  const handleNewNumberChange = (event) => setNewNumber(event.target.value)
  const handleNameFilterChange = (event) => setNameFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson === undefined) {
      personService
        .postPerson({name: newName, number: newNumber})
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          setNotification({message: `${person.name} added to phonebook`, positive: true})
          setTimeout(() => { setNotification(emptyNotification) }, notificationTime)
        })
    } else {
      if (!window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        return
      }
      personService
        .putPerson({...existingPerson, number: newNumber})
        .then(newPerson => {
          setPersons(persons.map(person => person.id === newPerson.id? newPerson: person))
          setNewName('')
          setNewNumber('')
          setNotification({message: `${newPerson.name}'s number changed in phonebook`, positive: true})
          setTimeout(() => { setNotification(emptyNotification) }, notificationTime)
        })
    }
  }

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person)
        .then(_ => {
          setPersons(persons.filter(personFiltered => personFiltered.id !== person.id))
          setNotification({message: `${person.name} deleted from phonebook`, positive: true})
          setTimeout(() => { setNotification(emptyNotification) }, notificationTime)
        })
        .catch(error => {
          setNotification({message: `${person.name} already deleted from phonebook`, positive: false })
          setTimeout(() => { setNotification(emptyNotification) }, notificationTime)
          setPersons(persons.filter(personFiltered => personFiltered.id !== person.id))
        })
    }
  }

  const getPersonsHook = () => {
    personService.getAll()
      .then(persons => setPersons(persons))
  }
  useEffect(getPersonsHook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} positive={notification.positive} />
      <Filter value={nameFilter} onChange={handleNameFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        nameOnChange={handleNewNameChange}
        numberValue={newNumber}
        numberOnChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} nameFilter={nameFilter} deletePerson={deletePerson}/>
      </div>
  )
}

export default App

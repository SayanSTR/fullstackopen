import { useState, useEffect } from 'react'

import Numbers from './components/Numbers'
import Form from './components/Form'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  console.log('App component')
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notif, setNotif] = useState({ type: null, msg: null })

  const hook = () => {
    console.log('Calling Effect Hook...')
    personService.getAll().then(persons => {
      console.log('Fetched persons: ', persons)
      setPersons(persons)
    })
  }

  useEffect(hook, [])


  const showAddedNotification = (name) => {
    setNotif({ type: 'success', msg: `Added ${name}` })
    setTimeout(() => {
      setNotif({ type: null, msg: null })
    }, 5000)
  }

  const showDeletedNotification = (name) => {
    setNotif({ type: 'error', msg: `Deleted ${name}` })
    setTimeout(() => {
      setNotif({ type: null, msg: null })
    }, 5000)
  }

  const handleAddButtonClick = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Name cannot be empty')
      return
    }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
        return
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...existingPerson, number: newNumber }
          personService.updatePerson(existingPerson.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person));
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              console.log(error.response.data.error)
              setNotif({ type: 'error', msg: error.response.data.error})
              setTimeout(() => {
                setNotif({ type: null, msg: null })
              }, 5000)
            })
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
      personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          showAddedNotification(newPerson.name)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setNotif({ type: 'error', msg: error.response.data.error })
          setTimeout(() => {
            setNotif({ type: null, msg: null })
          }, 5000)
        })
    }
  }

  const handleOnNameChange = (event) => {
    // console.log('Event target: ', event.target)
    setNewName(event.target.value)
  }

  const handleOnNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleOnFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteButtonClick = (id) => {
    console.log('Delete button clicked for id: ', id)
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      const personToDelete = persons.find(person => person.id === id)
      personService.deletePerson(id).then(response => {
        const newPersons = persons.filter(person => person.id !== id)
        console.log('Delete response: ', response)
        showDeletedNotification(personToDelete.name)
        setPersons(newPersons)
      })
    }
  }

  console.log('Rendering App component with persons: ', persons, '')
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notif.type} message={notif.msg} />
      <Filter filter={filter} handleOnFilterChange={handleOnFilterChange} />
      <h2>add a new</h2>
      <Form newName={newName}
        newNumber={newNumber}
        handleAddButtonClick={handleAddButtonClick}
        handleOnNameChange={handleOnNameChange}
        handleOnNumberChange={handleOnNumberChange} />
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={filter} deleteHandler={handleDeleteButtonClick} />
    </div>
  )
}

export default App
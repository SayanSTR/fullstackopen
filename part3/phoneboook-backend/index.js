const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function generateId() {
  return Math.floor(Math.random() * 1000000000000);
}

app.get('/info', (req, res) => {
    const listSize = persons.length
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
    )
})

app.get('/api/persons', (req, res) => {
    res.status(200).json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => id === person.id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if(!person) {
        return res.status(400).json({
            error: 'Request body is missing!'
        })
    }
    if(!(person.name && person.number)) {
        return res.status(422).json({
            error: 'name or number must not be empty!'
        })
    }
    if(persons.find(p => person.name === p.name)) {
        res.status(412).json({
            error: 'name must be unique'
        })
    }
    person.id = generateId()
    persons = persons.concat(person)
    res.status(201).json(persons[persons.length - 1])
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
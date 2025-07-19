require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req, res) => {
	return req.method === 'POST' ? JSON.stringify(req.body) : ''
})
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"), "-",
			tokens["response-time"](req, res), "ms",
			tokens.method(req) === "POST" ? JSON.stringify(req.body) : ""
		].join(" ")
	})
)

function generateId() {
	return String(Math.floor(Math.random() * 1000000000000));
}

app.get('/info', (req, res) => {
	const listSize = persons.length
	res.send(
		`<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date().toString()}</p>`
	)
})
// CREATE
app.post('/api/persons', (req, res, next) => {
	const person = req.body
	if (!person) {
		return res.status(400).json({
			error: 'Request body is missing!'
		})
	}
	if (!(person.name && person.number)) {
		return res.status(422).json({
			error: 'name or number must not be empty!'
		})
	}
	Person.find({ name: person.name })
		.then(existingPerson => {
			if (existingPerson.length) {
				return res.status(412).json({
					error: 'name must be unique'
				})
			}
			new Person({
				name: person.name,
				number: person.number,
			}).save().then(savedPerson => {
				res.status(201).json(savedPerson)
			}).catch(error => next(error))
		})


})
// READ
app.get('/api/persons', (req, res, next) => {
	Person.find({}).then(persons => {
		res.status(200).json(persons)
	})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id).then(person => {
		if (person) {
			res.json(person)
		} else {
			res.status(404).end()
		}
	}).catch(error => next(error))
})
// UPDATE
app.put('/api/persons/:id', (req, res, next) => {
	const person = req.body
	if (!person) {
		return res.status(400).json({
			error: 'Request body is missing!'
		})
	}
	if (!(person.name && person.number)) {
		return res.status(422).json({
			error: 'name or number must not be empty!'
		})
	}
	Person.findByIdAndUpdate(req.params.id, person, { new: true }).then(person => {
		if (person) {
			res.json(person)
		} else {
			res.status(404).end()
		}
	}).catch(error => next(error))
})
// DELETE
app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(deletedPerson => {
			res.status(204).end()
		}).catch(error => next(error))

})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint!' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name == 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}
	if (error) {
		return response.status(500).send({ error: `Exception occurred: ${error.message}` })
	}
	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
const { application } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response) => response.json(persons))

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const text = '<h3>Phonebook has info for ' + persons.length + ' people<h3>'
        + '<h4>' + today.toUTCString() + '</h4>'
    
    response.send(text)
})

app.delete('/api/persons/:id', (request, response) => {

    console.log(request.params);
    const id = Number(request.params.id)
    persons = persons.filter( p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(p => p.id))
        : 0
    return maxId + 1
}

const isExist = (name) => {
    return persons.find( p => p.name == name)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json( {
            error: 'name or number is missing'
        })
    }

    const name = body.name
    const number = body.number

    if (isExist(name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: name,
        number: number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
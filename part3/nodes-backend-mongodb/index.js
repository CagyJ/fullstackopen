require('dotenv').config

const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.use(express.json())

const cors = require('cors')
app.use(cors())


const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

// change toJSON method, delete the __v and __id, also set __id to id property
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Note = mongoose.model('Node', noteSchema)


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// automatically set the Content-Type be application/json
app.get('/api/notes', (request, response) => {
    Note.find({}).then(result => {
        console.log(result);
        response.json(result)
    })
})

// use colon syntax to define parameters in express
app.get('/api/notes/:id', (request, response) => {
    // the para should be 'string'
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {
        response.json(note)
    } else {
        // display 404 error
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {

    const body = request.body

    if (!body.content) {
        return response.status(400).json( {
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = process.env.PORT
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
require('dotenv').config({
    path: `${__dirname}/mongodb.env`
})

const express = require('express')
const app = express()
const Note = require('./models/note')

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(result => {
        console.log(result);
        response.json(result)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error);
            response.status(400).end({ error: 'malformatted id'})
        })
        
})

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)

//     response.status(204).end()
// })

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json( {
            error: 'content missing'
        })
    }
    console.log(body);

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

const PORT = process.env.PORT
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
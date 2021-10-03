require('dotenv').config({
    path: `${__dirname}/mongodb.env`
})

const express = require('express')
const app = express()
const NoteService = require('./service/noteService')
const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    const result = NoteService.init();
    response.send(result);
})

app.get('/api/notes', async (request, response, next) => {
    try {
        const result = await NoteService.list();
        console.log(result);
        response.json(result);
    } catch (error) {
        next(error)
    }

})

app.get('/api/notes/:id', async (request, response, next) => {
    try {
        const result = await NoteService.selectById(request.params.id);
        if (result) {
            console.log(result);
            response.json(result)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }    
})

app.delete('/api/notes/:id', async (request, response, next) => {
    try {
        await NoteService.deleteById(request.params.id)
        console.log("deleting id" + request.params.id);
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

app.post('/api/notes', async (request, response, next) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json( {
            error: 'content missing'
        })
    }
    console.log(body);

    try {
        const savedNote = await NoteService.addNote(body);
        console.log(savedNote);
        response.json(savedNote);
    } catch (error) {
        next(error)
    }
})

app.put('/api/notes/:id', async (request, response, next) => {
    const body = request.body

    try {
        const updatedNote = await NoteService.updateNote(request.params.id, body);
        response.json(updatedNote);
    } catch (error) {
        next(error)
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
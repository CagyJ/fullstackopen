// console.log('hello world')

// const http = require('http')

const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy?",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
]

// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'text/plain' })
//     // response.end('Hello World')
//     response.end(JSON.stringify(notes))
// })


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// automatically set the Content-Type be application/json
app.get('/api/notes', (request, response) => {
    response.json(notes)
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

const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
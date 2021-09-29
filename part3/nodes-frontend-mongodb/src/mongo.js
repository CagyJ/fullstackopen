const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cagyjiao:${password}@cluster0.iac40.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Node', noteSchema)

const note = new Note({
    content: 'HTML is Easy',
    date: new Date(),
    important: true
})

// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })

// we could add the filter condition in find() method as the parameter, 
// like xx.find({important: true})
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
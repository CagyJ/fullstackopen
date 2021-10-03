const Note = require('../models/note')

const init = () => {
    return '<h1>Hello World!</h1>'
}

const list = async () => {
    const result = await Note.find({})
    return result
}

const selectById = async (id) => {
    const result = await Note.findById(id)
    return result;
}

const deleteById = async (id) => {
    await Note.findByIdAndRemove(id)
}

const addNote = async (body) => {
    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    })

    const savedNote = await note.save();
    return savedNote;
}

const updateNote = async (id, body) => {
    const note = {
        content: body.content,
        important: body.important,
    }
    const updatedNote = await Note.findByIdAndUpdate(id, note, {new: true})
    return updatedNote;
}

const NoteService = {
    init,
    list,
    selectById,
    deleteById,
    addNote,
    updateNote,
    
}

module.exports = NoteService
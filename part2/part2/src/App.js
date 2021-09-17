import React, { useState } from 'react';
import Note from './components/Note'

const App = ( {notes} ) => {

  const [noteArr, setNoteArr] = useState(notes);
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    // prevents the default action of submitting a form
    event.preventDefault();
    console.log('button clicked', event.target);  
  }

  const handleNoteChange = (event) => {
    console.log(event);
    setNewNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      {/* <ul>
        {notes.map((note, i) =>
          <li key={i}>
            {note.content}
          </li>
        )}
      </ul> */}

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;

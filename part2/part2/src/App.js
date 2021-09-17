import React, { useState } from 'react';
import Note from './components/Note'

const App = ( {notes} ) => {

  const [noteArr, setNoteArr] = useState(notes);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    // prevents the default action of submitting a form
    event.preventDefault();
    console.log('button clicked', event.target);  

    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      import: Math.random() < 0.5,
      id: notes.length + 1
    };

    setNoteArr(notes.concat(noteObject));
    setNewNote('');
  }

  const handleNoteChange = (event) => {
    console.log(event);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll 
                        ? notes
                        : notes.filter(note => note.important === true);
  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'importand' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => 
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

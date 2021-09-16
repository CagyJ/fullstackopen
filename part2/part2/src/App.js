import React from 'react';
import Note from './components/Note'

const App = ( {notes} ) => {

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
    </div>
  )
}

export default App;

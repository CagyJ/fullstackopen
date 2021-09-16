import React from 'react';

const App = (props) => {
  const { notes } = props;


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <li key={note.id}>
            {note.content}
          </li>
        )}
      </ul>
      <ul>
        {notes.map((note, i) =>
          <li key={i}>
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default App;

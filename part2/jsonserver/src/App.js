import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = ( ) => {

  const [noteArr, setNoteArr] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);

  // executed immediately after rendering
  // useEffect(() => {
  //   console.log('effect');
  //   axios
  //     .get('http://localhost:3001/notes')
  //     .then(response => {
  //       console.log('promise fulfilled');
  //       setNoteArr(response.data);
  //     })
  // }, []);

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled');
        setNoteArr(response.data);
      })
  }

  useEffect(hook, []);

  console.log('render', noteArr.length, 'notes');

  const addNote = (event) => {
    // prevents the default action of submitting a form
    event.preventDefault();
    console.log('button clicked', event.target);  

    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      import: Math.random() < 0.5,
      id: noteArr.length + 1
    };

    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response);
        setNoteArr(noteArr.concat(noteObject));
        setNewNote('');
      })
  }

  const handleNoteChange = (event) => {
    console.log(event);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll 
                        ? noteArr
                        : noteArr.filter(note => note.important === true);
  
  const toggleImportanceOf = (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    const url = `http://localhost:3001/notes/${id}`
    const note = noteArr.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    axios.put(url, changedNote).then(response => {
      setNoteArr(noteArr.map(note => note.id !== id ? note : response.data))
    })
  }

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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
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

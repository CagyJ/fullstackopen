import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './service/note';
import './app.css';
import { motion } from "framer-motion";

const App = ( ) => {

  const [noteArr, setNoteArr] = useState([]);
  const [newNote, setNewNote] = useState('a new note...');
  const [showAll, setShowAll] = useState(true);
  const [isReady, setIsReady] = useState(false);


const hook = () => {
    setTimeout(
      async () => {
        console.log('effect');
        try {
          const initialNotes = await noteService.getAll2()
          setNoteArr(initialNotes)
          setIsReady(true)
        } catch(error) {
          console.error(error);
        }
      }
    , 1500)
    // func()
  }

  useEffect(hook, []);

  console.log('render', noteArr.length, 'notes');

  const addNote = async (event) => {
    // prevents the default action of submitting a form
    event.preventDefault();
    console.log('button clicked', event.target);  

    const noteObject = {
      content: newNote,
      data: new Date().toISOString(),
      import: Math.random() < 0.5,
      id: noteArr.length + 1
    };

    try {
      const returnedNote = await noteService.create(noteObject);
      setNoteArr(noteArr.concat(returnedNote))
      setNewNote('');
    } catch(error) {
      console.log(error);
    }
      
  }

  const handleNoteChange = (event) => {
    console.log(event);
    setNewNote(event.target.value);
  }

  const notesToShow = showAll 
                        ? noteArr
                        : noteArr.filter(note => note.important === true);
  
  const toggleImportanceOf = async (id) => {
    console.log('importance of ' + id + ' needs to be toggled');
    const note = noteArr.find(n => n.id === id);
    const changedNote = {...note, important: !note.important};

    try {
      const returnedNote = await noteService.update(id, changedNote);
      setNoteArr(noteArr.map(note => note.id !== id ? note : returnedNote));
    } catch (error) {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNoteArr(noteArr.filter(n => n.id !== id))
    }
  }

  const containerStyle = {
    position: "relative",
    width: "3rem",
    height: "3rem",
    boxSizing: "border-box"
  };

  const spinTransition = {
    loop: Infinity,
    ease: "linear",
    duration: 1,
  }

  const circleStyle = {
    display: "block",
    width: "3rem",
    height: "3rem",
    border: "0.5rem solid #e9e9e9",
    borderTop: "0.5rem solid #3498db",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
  };

  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'importand' : 'all'}
        </button>
      </div>
      
      {
        isReady 
        ? <ul>
            {notesToShow.map(note => 
              <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
            )}
          </ul>
        : <div style={containerStyle}>
            <motion.span
              style={circleStyle}
              animate={{ rotate: 360 }}
              transition={spinTransition}
            />
          </div>
      }

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;

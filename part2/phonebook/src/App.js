import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterArea, setFilterArea] = useState('');

  const nameChangeHandler = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const numberChangeHandler = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const filterChangeHandler = (event) => {
    console.log(event.target.value);
    setFilterArea(event.target.value);
  }


  const addPerson = (event) => {
      event.preventDefault();
      if (!isExist) {
        const newPerson = {name: newName, number: newNumber};
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      } else {
        window.alert(`${newName} is already added to phonebook`);
      }
  }

  const isExist = () => {
    let res = false;
    persons.forEach(person => {
      res = person.name === newName ? true : res;
    });

    return res;
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      
      <div>
        filter shown with<input type='text' value={filterArea} onChange={filterChangeHandler}/>
      </div>
      

      <h2>Add NEW</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input value={newName} onChange={nameChangeHandler}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChangeHandler}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      { persons
            .filter(person => 
              person.name && person.name.toLowerCase().includes(filterArea.toLowerCase())
            )    
            .map(person =>
              <h4 key={person.id}>{person.name} {person.number}</h4>
            )
      }
    </div>
  )
}

export default App;

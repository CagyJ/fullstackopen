import React, { useState } from 'react'

const Filter = ({filterArea, inputChangeHandler}) => {
  return (
    <div>
      filter shown with<input name='filter' type='text' value={filterArea} onChange={inputChangeHandler}/>
    </div>
  )
}

const PersonForm = ({onSubmit, newName, newNumber, onChange}) => {
  return (
    <div>
      <form onSubmit={onSubmit}> 
        <div>
          name: <input name='name' value={newName} onChange={onChange}/>
        </div>
        <div>
          number: <input name='number' value={newNumber} onChange={onChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({persons, filterArea}) => {
  return (
    <div>
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

  const inputChangeHandler = (event) => {
    const name = event.target.name;
    if (name === 'name') {
      nameChangeHandler(event);
    } else if (name === 'number') {
      numberChangeHandler(event);
    } else {
      filterChangeHandler(event);
    }
  }

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
      console.log(event);
      if (!isExist(newName)) {
        const newPerson = {name: newName, number: newNumber, id: persons.length+1};
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
      } else {
        window.alert(`${newName} is already added to phonebook`);
      }
  }

  const isExist = (name) => {
    const res = persons.filter(person => 
      person.name === name
    );
    console.log(res);
    return res.length > 0;
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter filterArea={filterArea} inputChangeHandler={inputChangeHandler}/>


      <h2>Add NEW</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} onChange={inputChangeHandler}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filterArea={filterArea} />

    </div>
  )
}

export default App;
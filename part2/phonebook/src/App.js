import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Persons = ({persons, filterArea, clickDelete}) => {
  return (
    <div>
    { persons
      .filter(person => 
        person.name && person.name.toLowerCase().includes(filterArea.toLowerCase())
      )    
      .map(person =>
        <h4 key={person.id}>{person.name} {person.number} <button onClick={()=>clickDelete(person.id)}>delete</button></h4>
      )
    }
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [filterArea, setFilterArea] = useState('');

  useEffect(() => {
    console.log('effect is working');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled and setting the data');
        setPersons(response.data);
      })
  }, [])

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
        const newPerson = {name: newName, number: newNumber};
        axios
          .post('http://localhost:3001/persons', newPerson)
          .then(response => {
            console.log(response.data);
            setPersons(persons.concat(response.data));
            setNewName('');
            setNewNumber('');
          })

      } else {

        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          const p = persons.find(p => p.name === newName);
          const changedP = {...p, number: newNumber};
          axios
            .put(`http://localhost:3001/persons/${changedP.id}`, changedP)
            .then(response => {
              setPersons(persons.map(p => p.name === newName ? response.data : p));
            })
        }
      }
  }

  const isExist = (name) => {
    const res = persons.filter(person => 
      person.name === name
    );
    console.log(res);
    return res.length > 0;
  }

  const clickDelete = (id) => {
    console.log("deleting " + id);
    if(window.confirm(`Delete ${id}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          console.log(response);
          const newPersons = persons.filter(person => person.id === id);
          setPersons(newPersons);
        })
    }
  }

  return (
    <div>
      <h2>PhoneBook</h2>
      <Filter filterArea={filterArea} inputChangeHandler={inputChangeHandler}/>


      <h2>Add NEW</h2>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} onChange={inputChangeHandler}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filterArea={filterArea} clickDelete={clickDelete}/>

    </div>
  )
}

export default App;

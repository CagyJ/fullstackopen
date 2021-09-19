import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Display = ({findValue, countries}) => {
  if (findValue === '') {
    return (
      <div>Search Result will be here</div>
    )
  } else {
    const res = countries.filter((country) => country.name.toLowerCase().includes(findValue.toLowerCase()));
    
    if (res.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if(res.length === 1) {
      const c = res[0];
      return (
        <div>
          <h2>{c.name}</h2>
          <p>capital {c.capital}</p>
          <p>population {c.population}</p>

          <h3>Language</h3>
          {
            c.languages.map((lan, idx) => 
              <li key={idx}>{lan.name}</li>
            )
          }
          <img src={c.flag} alt="flag"/>
        </div>
      )
    } else {
      return (
        <div>
          {res.map((country, idx) => {
            return (
              <li key={idx}>{country.name}</li>
            )
          })}
        </div>
      )
    }
  }
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [findValue, setFindValue] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data);
      })
  }, [])

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    console.log(value);
    setFindValue(value);
  }

  return (
    <div className="App">
      
      <div>
        find countries<input value={findValue} onChange={inputChangeHandler}/>
      </div>
      
      <Display findValue={findValue} countries={countries}/>

    </div>
  );
}

export default App;

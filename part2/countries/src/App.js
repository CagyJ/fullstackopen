import React, { useState, useEffect} from 'react';
import axios from 'axios';

const ShowCountry = ({c}) => {
  
  const [weather, setWeather] = useState({})

  useEffect(() => {
    const api_url = "http://api.weatherstack.com/current"
    const api_key = process.env.REACT_APP_API_KEY
    const capital = c.capital
    console.log('effect');
    axios
      .get(api_url + "?access_key=" + api_key +
            "&query=" + capital)
      .then(response => {
        console.log('promise fulfilled');
        console.log(response.data);
        setWeather(response.data);
      })
  }, [c.capital])

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
      {
        weather 
          ? (<>
              <h3>Weather in {c.capital}</h3>
              <p>temperature: {weather.current.temperature}</p>
              <img src={weather.current.weather_icons} alt="weather"/>
              <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
          </>) 
          : weather
      }

    </div>
  )
}


const Display = ({findValue, countries}) => {
  const [clicked, setClicked] = useState([]);

  const clickIt = (name) => {
    if(!clicked) {
      const filterC = clicked.filter((c) => c.name === name);
      if (filterC.length === 0) {
        setClicked(clicked.concat(
          {
            [name]: true
          }
        ))
      } else {
        const copy = [...clicked];
        copy[name] = !copy[name];
        setClicked(copy);
      }
    } else {
      setClicked(clicked.concat(
        {
          [name]: true
        }
      ))
    }
  }

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
        <ShowCountry c={c} />
      )
    } else {
      return (
        <div>
          {res.map((country, idx) => {
            return (
              <div key={idx}>
              <li name={country.name} key={idx}>
                {country.name} <button onClick={() => clickIt(country.name)}>show</button>
              </li>
              {clicked[country.name]
                ? <ShowCountry key={idx} c={country}/>
                : <></>
              }
              </div>
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

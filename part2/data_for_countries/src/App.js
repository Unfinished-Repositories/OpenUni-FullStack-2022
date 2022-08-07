import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({value, onChange}) =>
  <div>
    find countries
    <input
      value={value}
      onChange={onChange}
    />
  </div>

const TooManyCountries = () => <div>Too many matches, specify another filter</div>

const CountryListItem = ({country, setNameFilter}) =>
  <li>
    <div>
      {country.name.common}
      <button onClick={() => setNameFilter(country.name.common)}>show</button>
      </div>
  </li>

const CountriesList = ({countries, setNameFilter}) =>
  <ul>
    {
      countries.map(
        country =>
          <CountryListItem key={country.name.common} country={country} setNameFilter={setNameFilter} />
      )
    }
  </ul>

const CountryCapital = ({country}) => <p>capital {country.capital}</p>

const CountryArea = ({country}) => <p>area {country.area}</p>

const CountryLanguages = ({country}) =>
    <div>
      <h2>languages:</h2>
      <ul>
        {
          Object.values(country.languages).map(
            language => <li key={language}>{language}</li>
          )
        }
      </ul>
    </div>

const CountryMap = ({country}) => <img src={country.flags.png} alt="Flag"></img>

const Country = ({country}) =>
  <div>
    <h1>{country.name.common}</h1>
    <CountryCapital country={country} />
    <CountryArea country={country} />
    <CountryLanguages country={country} />
    <CountryMap country={country} />
    <CapitalWeather country={country} />
  </div>

const Details = ({countries, nameFilter, setNameFilter}) => {
  if (nameFilter !== '') {
    countries = countries.filter(
      country => country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
    )
  }
  if (countries.length === 0) {
    return
  } else if (countries.length === 1) {
    return <Country country={countries[0]}/>
  } else if (countries.length > 10) {
    return <TooManyCountries/>
  }
  return <CountriesList countries={countries} setNameFilter={setNameFilter}/>
}

const Temperature = ({weather}) => <p>Temperature {weather.main.temp} Celcius</p>

const Wind = ({weather}) => <p>Wind {weather.wind.speed} m/s</p>

const WeatherIcon = ({weather}) => <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon"></img>

const CapitalWeather = ({country}) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [country])
  if (Object.keys(weather).length !== 0) {
    console.log(weather)
    return <div>
      <Temperature weather={weather} />
      <WeatherIcon weather={weather} />
      <Wind weather={weather} />
    </div>
  }
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  const handleNameFilterChange = (event) => setNameFilter(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value={nameFilter} onChange={handleNameFilterChange}/>
      <Details countries={countries} nameFilter={nameFilter} setNameFilter={setNameFilter}/>
      </div>
  )
}

export default App

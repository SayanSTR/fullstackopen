import { useEffect, useState } from 'react'
import axios from 'axios'
import countryService from './services/countries'

import Filter from './components/Filter'
import CountryList from './components/CountryList'


function App() {
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])



  const initCountriesData = () => {
    console.log('initCountriesData:: Effect hook - Initializing countries data...')
    countryService.getAllCountries()
      .then(countries => {
        setCountries(countries)
        console.log('Countries data fetched and initialized:', countries)
      })
      .catch(error => {
        console.error('Error initializing countries data:', error)
      })
  }

  useEffect(initCountriesData, [])

  const handleOnFilterChange = (event) => {
    console.log(`setFilter :: ${event.target.value}`)
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleOnFilterChange={handleOnFilterChange} />
      <CountryList countries={countries} filter={filter}/>
    </div>
  )
}

export default App

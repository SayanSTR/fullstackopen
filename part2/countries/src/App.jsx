import { useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')

  return (
    <Filter filter={filter}/>
  )
}

export default App

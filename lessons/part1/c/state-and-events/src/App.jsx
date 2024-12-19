import './App.css'
import { useState } from 'react'

const App = (props) => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  console.log('rendering... ' + counter)
  return (
    <div>
      <Display counter={counter} />
      <Button handler={increaseByOne} text='plus' />
      <Button handler={setToZero} text='zero' />
      <Button handler={decreaseByOne} text='minus' />
    </div>
  )
}

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler}>
      {props.text}
    </button>
  )
}

export default App
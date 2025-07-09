const Form = ({ newName, newNumber, handleAddButtonClick, handleOnNameChange, handleOnNumberChange }) => {
  return (
    <form>
      <div>name: <input value={newName} onChange={handleOnNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleOnNumberChange} /></div>
      <div>
        <button type="submit" onClick={handleAddButtonClick}>add</button>
      </div>
    </form>
  )
}

export default Form
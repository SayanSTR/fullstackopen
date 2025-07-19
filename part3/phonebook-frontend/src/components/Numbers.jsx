const Numbers = ({ persons, filter, deleteHandler }) => {
  const filteredList = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('Filtered list: ', filteredList)
  return (
    <div>
      {filteredList.map(person => {
        return (
          <div key={person.id}>
            {person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>delete</button>
          </div>
        )
      }
    )}
    </div>
  )
}

export default Numbers
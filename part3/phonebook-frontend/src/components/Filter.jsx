const Filter = ({ filter, handleOnFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleOnFilterChange} />
    </div>
  );
}

export default Filter;
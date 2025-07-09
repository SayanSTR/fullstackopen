import PropTypes from 'prop-types';

const Filter = ({ filter, handleOnFilterChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={handleOnFilterChange} />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleOnFilterChange: PropTypes.func.isRequired,
};

export default Filter;
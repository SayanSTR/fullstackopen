import Country from "./Country";
import CountryItem from "./CountryItem";

const CountryList = ({ countries, filter }) => {
  const filteredCountries = countries
    .filter(
      country => country.name.common.toLowerCase()
        .includes(filter.toLowerCase()))
        .map(country => {return {...country, visible: false}});

  const clickHandler = (id) => {
    console.log('clickHandler :: ', id)
  }

  if (filter === '') {
    return (<></>);
  }
  if (filteredCountries.length === 0) {
    return (<>No matches found</>);
  }
  if (filteredCountries.length > 10) {
    return (<>Too many matches, specify another filter</>)
  }
  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }
  return filteredCountries.map(country => {
    return <CountryItem country={country} key={country.cca2} clickHandler={clickHandler} />;
  });
}

export default CountryList;
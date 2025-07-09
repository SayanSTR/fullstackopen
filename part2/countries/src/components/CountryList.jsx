import Country from "./Country";
import CountryItem from "./CountryItem";

const CountryList = ({ countries, filter }) => {
  const filteredCountries = countries
    .filter(
      country => country.name.common.toLowerCase()
        .includes(filter.toLowerCase()))
        .map(country => {return {...country, visible: false}});

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
    return <CountryItem key={country.cca3} country={country}/>;
  });
}

export default CountryList;
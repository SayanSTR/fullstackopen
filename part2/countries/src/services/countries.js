import axios from "axios";

const restCountriesUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const countriesDb = "http://localhost:3001/countries"

const getAllCountries = () => {
  return axios
    .get(restCountriesUrl)
    .then(response => {
      console.log("Countries fetched from REST API:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error fetching countries:", error);
    });
}

export default {getAllCountries};
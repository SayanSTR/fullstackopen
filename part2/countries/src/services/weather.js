import axios from 'axios';
import util from './utility';

const api_key = import.meta.env.VITE_OPENWEATHER_KEY
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&units=metric&appid={}";

const getWeather = (country) => {
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];
    const url = util.format(weatherApiUrl, lat, lon, api_key);
    return axios
        .get(url)
        .then(response => {
            console.log("Weather data fetched:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
};

export default {getWeather};


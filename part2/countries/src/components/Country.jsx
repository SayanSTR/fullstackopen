import { useState, useEffect } from 'react';
import weatherService from '../services/weather';

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);

	const fetchWeather = (country) => {
		weatherService.getWeather(country)
			.then(data => setWeather(data));
	}

	useEffect(() => {
		if (country.capitalInfo && country.capitalInfo.latlng) {
			fetchWeather(country);
		}
	}, [country]);

	console.log('Weather data:', weather);

	return (
		<div className="country">
			<h1>{country.name.common}</h1>
			Capital {country.capital}<br />
			Area {country.area}<br />
			<h2>Languages</h2>
			<ul>
				{Object.entries(country.languages).map(([langKey, langName]) => (
					<li key={langKey}>{langName}</li>
				))}
			</ul>
			<img src={country.flags.png} alt={country.flags.png} />
			{weather && (
				<>
					<h2>Weather in {country.capital}</h2>
					Temperature {weather.main.temp} Celsius<br />
					<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={country.weatherStateName} />
					<br/>
					Wind {weather.wind.speed} m/s<br/><br/>
				</>
			)}
		</div>
	)
}

export default Country;
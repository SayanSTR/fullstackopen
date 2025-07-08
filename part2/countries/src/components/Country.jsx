const Country = ({ country }) => {
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
        </div>
    )
}

export default Country;
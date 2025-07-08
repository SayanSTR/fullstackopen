import Country from "./Country"
import { useState } from "react";

const CountryItem = ({ country}) => {
    const [isVisible, setIsVisible] = useState(false);
    const clickHandler = () => {
        setIsVisible(!isVisible);
    }
    return (
        <div key={country.cca2}>
            <span>{country.name.common} </span>
            <button onClick = {() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hide' : 'Show'}
            </button>
            {isVisible && <Country country={country} />}
        </div>
    )
}

export default CountryItem;

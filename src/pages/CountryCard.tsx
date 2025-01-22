import React from "react";
import "./countrycard.css"

const CountryCard : React.FC =({country }) =>{

   console.log(88889, country)

    return(
        <div className="country-card"> 
                <p className="low-pad">Capital: {country.country.capital}</p>
                <p className="low-pad">Continent: {country.country.continent}</p>
                <p className="low-pad">Currency: {country.country.currency}</p>
                <p className="low-pad">Description: {country.country.description}</p>
                <p className="low-pad">Full Name: {country.country.full_name}</p>
                <p className="low-pad">Independence Date: {country.country.independence_date}</p>
                <p className="low-pad">ISO2: {country.country.iso2}</p>
                <p className="low-pad">ISO3: {country.country.iso3}</p>
                <p className="low-pad">Name: {country.country.name}</p>
                <p className="low-pad">Phone Code: {country.country.phone_code}</p>
                <p className="low-pad">Population: {country.country.population}</p>
                <p className="low-pad">Size: {country.country.size}</p>
                <p className="low-pad">Covid19 Status:</p>
                <p className="low-pad">Last Updated: {country.country.covid19.last_updated}</p>
                <p className="low-pad">Total Cases: {country.country.covid19.total_case}</p>
                <p className="low-pad">Total Deaths: {country.country.covid19.total_deaths}</p>
        </div>
    )

}

export default CountryCard;
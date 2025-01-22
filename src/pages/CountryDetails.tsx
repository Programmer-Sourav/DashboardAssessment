import React from "react";

const CountryDetails : React.FC = ({countryDetails}) =>{

    return(
        <div> 
         <h2>Country Information!</h2>
         <p><strong>Name:</strong> {countryDetails && countryDetails.name.common}</p>
         <p><strong>Official Name:</strong> {countryDetails && countryDetails.name.official}</p>
         <p><strong>Alt Spellings: </strong>{countryDetails && countryDetails.altSpellings.map((item :string)=><span>{item+", "}</span>)}</p>
         <p><strong>Borders: </strong>{countryDetails && countryDetails.borders.map((item :string)=><span>{item+", "}</span>)}</p>
         <p><strong>Capital:</strong>{countryDetails && countryDetails.capital}</p>
         <p><strong>Flags:</strong></p>
         <img src={countryDetails && countryDetails.flags.svg} height="128px" alt="indian-flag"/>
         <p><strong>Currencies:</strong> {countryDetails && Object.keys(countryDetails.currencies).map((countryCode)=>(
            countryDetails.currencies[countryCode].name))}</p>
         <p><strong>Currency Symbol:</strong> {countryDetails && Object.keys(countryDetails.currencies).map((countryCode)=>(
            countryDetails.currencies[countryCode].symbol
         ))}</p>
        </div>
    )
}

export default React.memo(CountryDetails);
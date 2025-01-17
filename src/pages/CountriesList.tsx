import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";


const CountriesList : React.FC = () =>{
    const countries = useSelector((state: RootState) => state.countries.countries);
    const dispatch = useDispatch<AppDispatch>();
    const [downloadedCountries, setDownloadedCountries] = useState([])
    const [perPageCount, setPerPageCount] = useState(1)
    const observer = useRef(null) 

    const ITEMS_PER_PAGE = 5;
    
//perPageCount, ITEMS_PER_PAGE
    useEffect(()=>{
        dispatch(fetchCountries())
    }, [])

    console.log(7777, countries)
    return(
    <div> 
        <h2>Users: {countries.map((country)=>(<li key={country.country.name}>
                <p>Capital: {country.country.capital}</p>
                <p>Continent: {country.country.continent}</p>
                <p>Currency: {country.country.currency}</p>
                <p>Description: {country.country.description}</p>
                <p>Full Name: {country.country.full_name}</p>
                <p>Independence Date: {country.country.independence_date}</p>
                <p>ISO2: {country.country.iso2}</p>
                <p>ISO3: {country.country.iso3}</p>
                <p>Name: {country.country.name}</p>
                <p>Phone Code: {country.country.phone_code}</p>
                <p>Population: {country.country.population}</p>
                <p>Size: {country.country.size}</p>
                <p>Covid19 Status:</p>
                <p>Last Updated: {country.country.covid19.last_updated}</p>
                <p>Total Cases: {country.country.covid19.total_case}</p>
                <p>Total Deaths: {country.country.covid19.total_deaths}</p>
                {/* <p>Current President:</p>
                <p>Name: {country.country.current_president!=null && country.country.current_president.name}</p>
                <p>Appointment Start Date: {country.country.current_president!=null && country.country.current_president.appointment_start_date}</p>
                <p>Appointment End Date: {country.country.current_president!=null && country.country.current_president.appointment_end_date!==null && country.current_president.appointment_end_date }</p>
                <p>Gender: {country.country.current_president!=null && country.country.current_president.gender}</p>
                <p>Personal info Links:{country.country.current_president!=null && country.country.current_president.href.self} </p>
                <p>{country.country.current_president!=null && country.country.current_president.href.country} </p>
                <p>{country.country.current_president!=null && country.country.current_president.href.picture} </p> */}
                {/* <p>About Country Links:</p>
                <p>{country.country.href.self}</p>
                <p>{country.country.href.picture}</p>
                <p>{country.country.href.country}</p>
                <p>{country.country.href.flag}</p>
                <p>{country.country.href.presidents}</p>
                <p>{country.country.href.states}</p> */}
                </li>))}</h2>
        
        
              {/* <button onClick={() => dispatch(fetchCountries())}>Fetch Data</button> */}
    </div>
    )
}

export default CountriesList;
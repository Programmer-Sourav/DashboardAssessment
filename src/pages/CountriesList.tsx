import "./scrollcontainer.css"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries, fetchSearchResults } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import CountryCard from "./CountryCard";


const CountriesList : React.FC = () =>{
    const countries = useSelector((state: RootState) => state.countries.country);
    const { loading } = useSelector((state: RootState)=>state.countries.country)
    console.log(333, countries.countries)
    const dispatch = useDispatch<AppDispatch>();
    const [startIndex, setStartIndex] = useState<number>(1)
    const [endIndex, setEndIndex] = useState<number>(5);
    const [filterValue, setFilterValue] = useState<string>("")
    const [filteredValue, setFilteredValue] = useState<any[]>([]); 
  


    
 const startIndexRef = useRef(startIndex);
 const endIndexRef = useRef(endIndex);

 useEffect(() => {
   startIndexRef.current = startIndex;
   endIndexRef.current = endIndex;
 }, [startIndex, endIndex]);

 useEffect(() => {
   dispatch(fetchCountries({ startIndex, endIndex }));
 }, [dispatch, startIndex, endIndex]);

 const handleScroll = () => {
   const scrollPosition = window.scrollY + window.innerHeight;
   const bottomPosition = document.documentElement.scrollHeight;

   if (scrollPosition >= bottomPosition - 100 && !loading) {
     setStartIndex((prevStartIndex) => prevStartIndex + 5);
     setEndIndex((prevEndIndex) => prevEndIndex + 5);
   }
 };


 useEffect(() => {
   window.addEventListener('scroll', handleScroll);

   return () => {
     window.removeEventListener('scroll', handleScroll);
   };
 }, [loading]);




 useEffect(() => {
  if (countries.countries && countries.countries.length) {
    // Filter out duplicate countries based on a unique key (like the country name or id)
    setFilteredValue((prevData) => {
      const newCountries = countries.countries.filter(
        (newCountry) => !prevData.some((existingCountry) => existingCountry.country.capital === newCountry.country.capital)
      );
      return [...prevData, ...newCountries];
    });
  }
}, [countries]);

console.log(5555, filteredValue)


    const onFilterChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
      setFilterValue(e.target.value)
    }
 
    console.log(555444, filteredValue);

    const filterOnButtonClick = () =>{
      if(filterValue){
        // console.log(777, filterValue)
        // console.log(88811111, filteredValue)
        let updatedData = [];
        updatedData= filteredValue.filter((item)=>item.country.continent.toLowerCase().includes(filterValue.toLowerCase()))
        //console.log(111333, updatedData)
        setFilteredValue(updatedData);
      }
    }

  

    return(
    <>
    <div>
      <div  className="linkbody">
      <Link to="/">Home</Link>
      <Link to="/search">Search Countries</Link>
      </div>
    <label>Filter By Region: </label>
    <input type="search" value={filterValue} placeholder="Filter by region... " onChange={(e)=>{onFilterChange(e)}} className="searchbox"/>
    <button onClick={()=>{filterOnButtonClick()}}>Filter</button>
    </div>
    <div className="scroll-container"> 
        <h2>Users: {filteredValue.map((country, index)=>(<li key={index} className={index === countries.countries.length-1  ? "last-item" : "currentItem"} style={{listStyle: "none", margin:"16px"}}>
                  <CountryCard country = {country} />
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
                <div className="loader"></div>
        
              {/* <button onClick={() => dispatch(fetchCountries())}>Fetch Data</button> */}
    </div>
    </>   
    )
}

export default React.memo(CountriesList);
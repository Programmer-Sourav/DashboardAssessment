import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSearchResults, fetchSearchResultsByCapital, fetchSearchResultsByRegion, updateSearchValue } from "../redux/userSlice";
import CountryDetails from "./CountryDetails";
import "./searchcountries.css"

const SearchCountries : React.FC = () =>{
      const [selectedValue, setSelectedValue] = useState<string>("")
      const [searchValueState, setSearchValueState] = useState<string>("");

    const searchValue = useSelector((state: RootState) => state.countries.search.searchValue);
    const searchResult = useSelector((state: RootState)=> state.countries.search.countries);
    const search = useSelector((state: RootState)=>state.countries.search)
 
    const dispatch = useDispatch<AppDispatch>();
    const onSearchValueChange = (e) =>{
        //console.log(333, " "+e.target.value )
        dispatch(updateSearchValue(e.target.value ))
    }
   const countryDetails = searchResult.countries ;
   console.log(5555, countryDetails);

   const onSelectValueChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    setSelectedValue(e.target.value)
   }

 
   const onSearchChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    //setSearchValueState(e.target.value)
    dispatch(updateSearchValue(e.target.value ))
  }

  console.log(4441, selectedValue)
  console.log(4442, searchValueState);
  
  const onBtnClick = () =>{
    if(selectedValue==="name"){
        console.log(5551, searchValue);
        dispatch(fetchSearchResults({searchValue}))
       }
       if(selectedValue ==="capital"){
        dispatch(fetchSearchResultsByCapital({searchValue}))
       }
       if(selectedValue === "region"){
        dispatch(fetchSearchResultsByRegion({searchValue}))
       }
  }
    return(
        <div> 
       {/* <div>
    <label>Search By Name or Capital: </label>
    <div>
    <input type="search" value={searchValueState} placeholder="Search by capital or name... " className="searchbox" onChange={(e)=>{onSearchChange(e)}}/>
    
    </div>
    </div> */}
    <input type="search" className="searchbox" value={searchValue} placeholder="Search by Country, Region or Capital" onChange={(e)=>{onSearchValueChange(e)}}/>
    <select value={selectedValue} className="selectbox" onChange={(e)=>{onSelectValueChange(e)}}>
      <option value="select">Select </option>
      <option value="region">By Region</option>
      <option value="capital">By Capital</option>
      <option value="name">By Country Name</option>
    </select>
        <button onClick={()=>{ onBtnClick()}}>Search By Country</button>
        <CountryDetails countryDetails= {countryDetails}/>
        </div>
    )

}

export default React.memo(SearchCountries);
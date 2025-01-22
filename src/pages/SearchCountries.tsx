import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSearchResults, updateSearchValue } from "../redux/userSlice";
import CountryDetails from "./CountryDetails";

const SearchCountries : React.FC = () =>{
    const searchValue = useSelector((state: RootState) => state.countries.search.searchValue);
    const searchResult = useSelector((state: RootState)=> state.countries.search.countries);
    const search = useSelector((state: RootState)=>state.countries.search)
 
    const dispatch = useDispatch<AppDispatch>();
    const onSearchValueChange = (e) =>{
        //console.log(333, " "+e.target.value )
        dispatch(updateSearchValue(e.target.value ))
    }
   const countryDetails = searchResult.countries ;
  
    return(
        <div> 
      
        <input type="search" value={searchValue} placeholder="Search by Country" onChange={(e)=>{onSearchValueChange(e)}}/>
        <button onClick={()=>{ dispatch(fetchSearchResults({searchValue}))}}>Search By Country</button>
        <CountryDetails countryDetails= {countryDetails}/>
        </div>
    )

}

export default React.memo(SearchCountries);
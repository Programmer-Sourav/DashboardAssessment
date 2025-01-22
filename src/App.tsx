// App.tsx
import React from "react";
import CountriesList from "./pages/CountriesList";
import { Route, Routes } from "react-router";
import CountryDetails from "./pages/CountryDetails";
import SearchCountries from "./pages/SearchCountries";

const App: React.FC = () => {


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
     <Routes>
      <Route path="/" element={<CountriesList/>}/>
      <Route path="/home" element={<CountriesList/>}/>
      <Route path="/details/:id" element={<CountryDetails/>}/>
      <Route path="/search" element={<SearchCountries/>}/>
     </Routes>
     {/* <CountriesList/> */}
    </div>
  );
};

export default App;


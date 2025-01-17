// App.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

import { fetchCountries } from "./redux/userSlice";
import CountriesList from "./pages/CountriesList";

const App: React.FC = () => {


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
     <CountriesList/>
    </div>
  );
};

export default App;


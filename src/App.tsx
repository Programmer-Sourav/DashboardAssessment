// App.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

import { fetchCountries } from "./redux/userSlice";

const App: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.countries);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Users: {users.map((user)=>(<li>{user}</li>))}</h2>
      <button onClick={() => dispatch(fetchCountries())}>Fetch Data</button>

    </div>
  );
};

export default App;


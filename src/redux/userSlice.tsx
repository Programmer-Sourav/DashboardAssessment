import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state

interface Country{
  country: CountryItem
}
interface CountryItem {
  capital : string;
  continent: string;
  covid19 : {last_updated: string, total_case: string, total_deaths: string},
  currency: string;
  current_president: {name: string; appointment_end_date : string | null; appointment_start_date: string | null; gender:string | null; href: {country: string; 
    picture: string; self: string}
  };
  description: string;
  full_name: string;
  href: {self: string; picture: string; country: string; flag: string; presidents: string; states: string};
  independence_date: string;
  iso2: string;
  iso3: string;
  name: string;
  phone_code: string;
  population: string;
  size: string;
}

interface CountryState {
  loading: boolean;
  error: string | null;
  countries: Country[];
}

// Initial state
const initialState: CountryState = {
  loading: false,
  error: null,
  countries: [],
};

// Async thunk for fetching users
export const fetchCountries = createAsyncThunk<Country[]>("countries/fetchCountries", async () => {
  const response = await fetch("https://93e82930-6fa7-4bbd-9b80-821ecfd2655c-00-3v33z4yab0pu9.pike.replit.dev/countries", 
  {  method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    });
  console.log(2222, response) 
  let data, countries; 
  try{
  data = await response.json();
  //countries = data.data;
  console.log(1111, data);
  }
  catch(error){
    console.log(2222, error)
  }
  return data; // This should return an array of strings (country names)
  //return data.map((user: { name: string }) => user.name); // Return only user names
});

// Create the slice
const userSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {}, // No reducers in this example
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

// Export the reducer
export default userSlice.reducer;


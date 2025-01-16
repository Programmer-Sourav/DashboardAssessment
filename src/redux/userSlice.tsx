import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
interface CountryState {
  loading: boolean;
  error: string | null;
  countries: string[];
}

// Initial state
const initialState: CountryState = {
  loading: false,
  error: null,
  countries: [],
};

// Async thunk for fetching users
export const fetchCountries = createAsyncThunk<string[]>("countries/fetchCountries", async () => {
  const response = await fetch("https://0f93707a-8313-4ece-9ace-dd41e41e6ae0-00-r4k6klm1d7py.sisko.replit.dev/countries/");
  const data = await response.json();
  console.log(1111, data);
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
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<string[]>) => {
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


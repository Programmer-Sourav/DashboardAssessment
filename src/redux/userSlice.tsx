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
  //type: "country";
  loading: boolean;
  error: string | null;
  countries: Country[];
}

// Define an interface for the thunk's parameters
interface FetchCountriesParams {
  startIndex: number;
  endIndex: number;
}

interface SearchState {
  // type: "search";
  loading: boolean;
  error: string | null;
  searchValue: string;
  countries: SearchItem[];
}

//type AppState = SearchState | CountryState
//Combine the Initial States into One
interface AppState {
  country: CountryState;
  search: SearchState;
}

//const initialState: AppState = initialCountryState; // Start with country state

interface SearchParams{
  searchValue : string
}
//const isSearchState = (state: AppState): state is SearchState => state.type === "search";

const initialState: AppState = {
  country: {
    loading: false,
    error: null,
    countries: [],
  },
  search: {
    loading: false,
    error: null,
    searchValue: "",
    countries: []
  },
};

type SearchCountry = {
   altSpellings: string[],
   area : number,
   borders: string[],
   capital: string[],
   capitalInfo : {latlng: string[]},
   continents: string[],
   currencies: {INR: {name: string, symbol: string}},
   flags: {png: string, alt: string, svg: string},
   languages: {language: string},
   maps: {googleMaps: string, openStreetMaps: string},
   name: {common: string, official: string, nativeName: {language: {official: string, common: string}}},
   population: number
}



// type SearchItem = {
//   name: {
//     common: string;
//     official: string;
//   };
//   cca2: string;
//   cca3: string;
//   ccn3?: string; // Optional, as not all countries have this field
//   capital: string;
//   languages: string[];
//   population: number;
//   area: number;
//   currency: Currency;
//   region: string;
//   subregion: string;
//   flag: string;
//   maps: {
//     googleMaps: string;
//     openStreetMaps: string;
//   };
// };

type Currency = {
  name: string;
  symbol: string;
};

type Demonym = {
  eng: {
    f: string;
    m: string;
  };
  fra: {
    f: string;
    m: string;
  };
};

type Translations = {
  [key: string]: {
    official: string;
    common: string;
  };
};

type CapitalInfo = {
  latlng: [number, number];
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};

type CoatOfArms = {
  png?: string;
  svg?: string;
};

type Maps = {
  googleMaps: string;
  openStreetMaps: string;
};

// type SearchCountry = {
//   name: {
//     common: string;
//     official: string;
//     nativeName: {
//       [key: string]: {
//         official: string;
//         common: string;
//       };
//     };
//   };
//   tld: string[];
//   cca2: string;
//   ccn3: string;
//   cca3: string;
//   cioc: string;
//   independent: boolean;
//   status: string;
//   unMember: boolean;
//   currencies: {
//     [key: string]: Currency;
//   };
//   idd: {
//     root: string;
//     suffixes: string[];
//   };
//   capital: string[];
//   altSpellings: string[];
//   region: string;
//   subregion: string;
//   languages: {
//     [key: string]: string;
//   };
//   translations: Translations;
//   latlng: [number, number];
//   landlocked: boolean;
//   borders: string[];
//   area: number;
//   demonyms: Demonym;
//   flag: string;
//   maps: Maps;
//   population: number;
//   gini?: {
//     [year: string]: number;
//   };
//   fifa?: string;
//   car?: {
//     signs: string[];
//     side: string;
//   };
//   timezones: string[];
//   continents: string[];
//   flags: Flags;
//   coatOfArms: CoatOfArms;
//   startOfWeek: string;
//   capitalInfo: CapitalInfo;
//   postalCode?: {
//     format: string;
//     regex: string;
//   };
// };

type SearchItem = {
  countries: SearchCountry[];
};


interface Search{
  searchResult: SearchItem
}

export const fetchSearchResults = createAsyncThunk<SearchItem[], SearchParams>(
   "countries/fetchSearchResult",
   async ({ searchValue }, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `http://35.173.230.235:3000/countries/search?name=${searchValue}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(7777, data);
        // Validate response
        // if (!Array.isArray(data)) {
        //     throw new Error("Invalid response format");
        // }
        console.log(999999, data as SearchItem[])
        return data as SearchItem[];
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : "Unknown error"
        );
    }
}
);

// Async thunk to fetch countries
export const fetchCountries = createAsyncThunk<Country[], FetchCountriesParams>(
  "countries/fetchCountries",
  async ({ startIndex, endIndex }, { rejectWithValue }) => {
      try {
          const response = await fetch(
              `http://35.173.230.235:3000/countries/${startIndex}/${endIndex}`,
              {
                  method: "GET",
                  headers: {
                      "Content-Type": "application/json",
                  },
              }
          );

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Validate response
          if (!Array.isArray(data)) {
              throw new Error("Invalid response format");
          }

          return data as Country[];
      } catch (error) {
          return rejectWithValue(
              error instanceof Error ? error.message : "Unknown error"
          );
      }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "countries",//app
  initialState,
  reducers: {
    // Example of handling search state updates
    updateSearchValue: (state, action: PayloadAction<string>) => {
        console.log(4444, action.payload);
        state.search.searchValue = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
     
          state.country.loading = true;
          state.country.error = null;
        
      })
      .addCase(fetchCountries.fulfilled, (state, action: PayloadAction<Country[]>) => {
          console.log(999555, action.payload)
          state.country.loading = false;
          state.country.countries = action.payload;
        
      })
      .addCase(fetchCountries.rejected, (state, action) => {
    
          state.country.loading = false;
          state.country.error = action.error.message || "Failed to fetch countries";
        
      })
      .addCase(fetchSearchResults.pending, (state)=>{
         state.search.loading = true;
         state.search.error = null
      })
      .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<SearchItem[]>) =>{
        console.log(88888, action.payload);
         state.search.loading = false;
         state.search.countries = action.payload;

      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        console.log(888881, action.payload);
          state.search.loading = false;
          state.search.error = action.error.message || "Failed to fetch countries";      
      })
  },
});

export const { updateSearchValue } = userSlice.actions;
// Export the reducer
export default userSlice.reducer;


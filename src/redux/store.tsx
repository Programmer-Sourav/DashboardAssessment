import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer, // Properly add the counterReducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



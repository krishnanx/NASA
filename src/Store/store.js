import { configureStore } from "@reduxjs/toolkit";
import espReducer from "../Store/espSlice";

export const store = configureStore({
  reducer: {
    esp: espReducer,

  },
});

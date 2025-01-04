import { configureStore } from "@reduxjs/toolkit";
import volReducer from "./slicers";

export const store = configureStore({
  reducer: {
    vols: volReducer,
  },
});

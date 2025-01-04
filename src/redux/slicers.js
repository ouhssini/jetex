import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const APP_URL = "https://gahi-said.com/apis/vols.php";

export const fetchVols = createAsyncThunk("vols/fetchVols", async () => {
  const response = await axios.get(APP_URL);
  return response.data;
});

const volsSlice = createSlice({
  name: "vols",
  initialState: {
    vols: [],
    status: "idle",
    error: null,
    selectedVol: null,
  },
  reducers: {
    volSelected: (state, action) => {
      state.selectedVol = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVols.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vols = action.payload;
      })
      .addCase(fetchVols.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const volReducer = volsSlice.reducer;
export const { volSelected } = volsSlice.actions;

export default volReducer;


import { createSlice } from "@reduxjs/toolkit";

const espSlice = createSlice({
  name: "esp",
  initialState: { espNo: 0 },
  reducers: {
    setEspNo: (state, action) => {
      state.espNo = action.payload;
    },
  },
});

export const { setEspNo } = espSlice.actions;
export default espSlice.reducer;

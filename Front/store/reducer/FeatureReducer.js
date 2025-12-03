import { createSlice } from "@reduxjs/toolkit";

const FeatureSlice = createSlice({
  name: "feature",
  initialState: {
    isOpen: false,
  },
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = FeatureSlice.actions;
export default FeatureSlice.reducer;

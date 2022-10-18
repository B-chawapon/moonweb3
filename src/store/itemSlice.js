import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listItem: [],
};

export const itemSlice = createSlice({
  name: "itemStore",
  initialState: initialState,
  reducers: {
    updateList: (state, action) => {
      state.listItem = action.payload;
    },
    deleteList: (state, action) => {
      state.listItem = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateList, deleteList } = itemSlice.actions;

export default itemSlice.reducer;

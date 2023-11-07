import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getCharacters: (state, action)  => {
      state.push(action.payload);
      console.log("Va a hacer algo")
    }
  },
});

export const { getCharacters } = taskSlice.actions;
export default taskSlice.reducer;
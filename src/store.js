import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './redux/pasteSlice'; // Adjust the path as necessary
// Import your slices (reducers)
export const store = configureStore({
  reducer: {
    paste: pasteReducer, 
    //paste is the name of the slice,
    //pasteReducer is the main reducer function for the slice, which internally uses all the case reducers defined in reducers."
    // Add more slices as needed
  },
});

export default store;
  
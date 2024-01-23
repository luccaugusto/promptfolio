import {createSlice} from '@reduxjs/toolkit';

export interface MobilePageState {
}

const welcomeText = "Linux V4.7.10 Psychotic Stoned Sheep</br>Welcome to Lucca's Prompfolio</br>Type `help` for available commands.";

const initialState: MobilePageState = {
};

export const mobilePageSlice = createSlice({
  name: 'mobilePage',
  initialState,
  reducers: {
  },
});

export default mobilePageSlice.reducer;

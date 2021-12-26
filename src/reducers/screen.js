import { createSlice } from '@reduxjs/toolkit';
import { screens } from 'constants/screens';

const initialState = {
  currentScreen: screens.Inbox,
};

export const screen = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen: (state, action) => {
      const { screen } = action.payload;
      state.currentScreen = screen;
    },
  },
});

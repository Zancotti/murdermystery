import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reportDetails: {
    murderer: '',
    victim: '',
    relationship: '',
    motive: '',
    inheritor: '',
  },
};

export const finalReport = createSlice({
  name: 'finalReport',
  initialState,
  reducers: {
    reset: () => initialState,

    setMurderer: (state, action) => {
      const { murderer } = action.payload;
      state.reportDetails.murderer = murderer;
    },
    setVictim: (state, action) => {
      const { victim } = action.payload;
      state.reportDetails.victim = victim;
    },
    setRelationship: (state, action) => {
      const { relationship } = action.payload;
      state.reportDetails.relationship = relationship;
    },
    setMotive: (state, action) => {
      const { motive } = action.payload;
      state.reportDetails.motive = motive;
    },
    setInheritor: (state, action) => {
      const { inheritor } = action.payload;
      state.reportDetails.inheritor = inheritor;
    },
  },
});

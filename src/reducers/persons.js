import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personList: [],
  selectedPerson: null,
  accessedPersonList: [],
  personSearchResult: null,
};

export const persons = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    reset: () => initialState,
    setPersonList: (state, action) => {
      const { personList } = action.payload;
      state.personList = personList;
    },

    setSelectedPerson: (state, action) => {
      const { selectedPerson } = action.payload;
      state.selectedPerson = selectedPerson;
    },

    addAccessedPerson: (state, action) => {
      const { person } = action.payload;
      if (!state.accessedPersonList.find(p => p._id === person._id)) {
        state.accessedPersonList = [...state.accessedPersonList, person];
      }
    },

    setPersonSearchResult: (state, action) => {
      const { person } = action.payload;
      state.personSearchResult = person;
    },
  },
});

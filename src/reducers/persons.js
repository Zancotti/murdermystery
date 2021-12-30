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
      if (!state.accessedPersonList.find(p => p.id === person.id)) {
        state.accessedPersonList = [...state.accessedPersonList, person];
      }
    },

    setPersonSearchResult: (state, action) => {
      const { person } = action.payload;
      state.personSearchResult = person;
    },
  },
});
// const personList = [
//   {
//     id: 1,
//     firstName: 'Sabrina',
//     lastName: 'Zancotti',
//     age: 31,
//   },
//   {
//     id: 2,
//     firstName: 'Amadeus',
//     lastName: 'Hein',
//     age: 32,
//   },
//   {
//     id: 3,
//     firstName: 'Sara',
//     lastName: 'Zancotti',
//     age: 35,
//   },
//   {
//     id: 4,
//     firstName: 'Zekija',
//     lastName: 'Zancotti',
//     age: 61,
//   },
// ];

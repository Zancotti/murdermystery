import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mailList: [],
  selectedMail: null,
};

export const inbox = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setMailList: (state, action) => {
      const { mailList } = action.payload;
      state.mailList = mailList;
      console.log('hej', mailList);
    },

    setSelectedMail: (state, action) => {
      const { selectedMail } = action.payload;
      state.selectedMail = selectedMail;
      if (!selectedMail) {
        return;
      }

      const index = state.mailList.findIndex(
        mail => mail.id === selectedMail.id,
      );
      const newMailList = [...state.mailList];
      newMailList[index].unread = false;
      state.mailList = newMailList;
    },
  },
});

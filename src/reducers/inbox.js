import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mailList: [],
  selectedMail: null,
  triggeredEvents: ['initial'],
};

export const inbox = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setMailList: (state, action) => {
      const { mailList } = action.payload;
      state.mailList = mailList;
    },

    setSelectedMail: (state, action) => {
      const { selectedMail } = action.payload;
      state.selectedMail = selectedMail;
      if (!selectedMail) {
        return;
      }

      const index = state.mailList.findIndex(
        mail => mail._id === selectedMail._id,
      );
      const newMailList = [...state.mailList];
      newMailList[index].unread = false;
      state.mailList = newMailList;
    },
    addTriggeredEvent: (state, action) => {
      const { event } = action.payload;
      if (!state.triggeredEvents.includes(event)) {
        state.triggeredEvents = [...state.triggeredEvents, event];
      }
    },
  },
});

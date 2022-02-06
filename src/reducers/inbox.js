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
    reset: () => initialState,

    setMailList: (state, action) => {
      const { mailList, skipTimeUpdate } = action.payload;

      if (!skipTimeUpdate) {
        mailList.forEach(mail => {
          mail.timeStamp = new Date();
        });
      }

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

      const mailsWithEvent = state.mailList.filter(mail =>
        mail.event.includes(event),
      );

      mailsWithEvent.forEach(mail => {
        mail.timeStamp = new Date();
      });

      if (!state.triggeredEvents.includes(event)) {
        state.triggeredEvents = [...state.triggeredEvents, event];
      }
    },

    setTriggeredEvents: (state, action) => {
      const { triggeredEvents } = action.payload;
      state.triggeredEvents = triggeredEvents;
    },
  },
});

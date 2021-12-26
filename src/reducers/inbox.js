import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const mails = [
  {
    id: 1,
    subject: 'Hej Hej',
    text: 'Jag tycker om dig',
    from: 'Sabrina Zancotti',
    picture: <FontAwesomeIcon icon={faUser} />,
    unread: true,
    timeStamp: new Date(),
  },
  {
    id: 2,
    subject: 'Jag vill skiljas',
    text: 'Jag tycker om dig',
    from: 'Sabrina Zancotti',
    picture: <FontAwesomeIcon icon={faUser} />,
    unread: false,
    timeStamp: new Date(),
  },
  {
    id: 3,
    subject: 'Jag älskar dig igen',
    text: 'Jag tycker om dig',
    from: 'Sabrina Zancotti',
    picture: <FontAwesomeIcon icon={faUser} />,
    unread: true,
    timeStamp: yesterday,
  },
];

const initialState = {
  mails: mails,
  selectedMail: null,
};

export const inbox = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setSelectedMail: (state, action) => {
      const { selectedMail } = action.payload;
      state.selectedMail = selectedMail;
      if (!selectedMail) {
        return;
      }

      const index = state.mails.findIndex(mail => mail.id === selectedMail.id);
      const newMailList = [...state.mails];
      newMailList[index].unread = false;
      state.mails = newMailList;
    },
  },
});

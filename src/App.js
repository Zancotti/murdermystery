import React from 'react';
import styled from 'styled-components/macro';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { inbox } from 'reducers/inbox';
import { persons } from 'reducers/persons';
import { files } from 'reducers/files';
import { user } from 'reducers/user';
import { Main } from 'Main';

const reducer = combineReducers({
  inbox: inbox.reducer,
  persons: persons.reducer,
  files: files.reducer,
  user: user.reducer,
});
const store = createStore(reducer);

export const App = () => {
  return (
    <Page>
      <Provider store={store}>
        <Main />
      </Provider>
    </Page>
  );
};

const Page = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

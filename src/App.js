import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { inbox } from 'reducers/inbox';
import { persons } from 'reducers/persons';
import { files } from 'reducers/files';
import { user } from 'reducers/user';
import { Main } from 'Main';
import styled from 'styled-components';
const reducer = combineReducers({
  inbox: inbox.reducer,
  persons: persons.reducer,
  files: files.reducer,
  user: user.reducer,
});

// const persistedStateJSON = localStorage.getItem('ReduxState');
// let persistedState = {};

// if (persistedStateJSON) {
//   persistedState = JSON.parse(persistedStateJSON);
// }

// const store = createStore(reducer, persistedState);
const store = createStore(reducer);

// store.subscribe(() => {
//   localStorage.setItem('ReduxState', JSON.stringify(store.getState()));
// });

export const App = () => {
  return (
    <Container>
      <Provider store={store}>
        <Main />
      </Provider>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  min-width: 300px;
`;

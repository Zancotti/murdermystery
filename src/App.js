import React from 'react';
import styled from 'styled-components/macro';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from '@reduxjs/toolkit';
import { MenuBar } from 'components/MenuBar';
import { Header } from 'components/Header';
import { ContentScreen } from 'screens/ContentScreen';
import { screen } from 'reducers/screen';
import { inbox } from 'reducers/inbox';
import { persons } from 'reducers/persons';
import { files } from 'reducers/files';

const reducer = combineReducers({
  screen: screen.reducer,
  inbox: inbox.reducer,
  persons: persons.reducer,
  files: files.reducer,
});
const store = createStore(reducer);

export const App = () => {
  return (
    <Page>
      <Header />
      <Provider store={store}>
        <Content>
          <MenuBarWrapper>
            <MenuBar />
          </MenuBarWrapper>
          <ContentScreen />
        </Content>
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

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  @media (max-width: 667px) {
    flex-direction: column;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MenuBarWrapper = styled.div`
  @media (max-width: 667px) {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

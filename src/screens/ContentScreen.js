import React from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { screens } from 'constants/screens';
import { InboxScreen } from './InboxScreen';
import { PersonsDbScreen } from './PersonsDbScreen';
import { FilesDbScreen } from './FilesDbScreen';

export const ContentScreen = () => {
  const currentScreen = useSelector(store => store.screen.currentScreen);

  return (
    <Main>
      {currentScreen === screens.Inbox && <InboxScreen />}
      {currentScreen === screens.PersonsDB && <PersonsDbScreen />}
      {currentScreen === screens.FilesDB && <FilesDbScreen />}
      {currentScreen === screens.FinalReport && <h1>Final Report</h1>}
    </Main>
  );
};

const Main = styled.main`
  width: 100%;
  height: 100%;
`;

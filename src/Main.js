import React from 'react';
import styled from 'styled-components/macro';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuBar } from 'components/MenuBar';
import { Header } from 'components/Header';
import { InboxScreen } from 'screens/InboxScreen';
import { PersonsDbScreen } from 'screens/PersonsDbScreen';
import { LoginScreen } from 'screens/LoginScreen';
import { FilesDbScreen } from 'screens/FilesDbScreen';
import { TelephoneScreen } from 'screens/TelephoneScreen';
import { FinalReportScreen } from 'screens/FinalReportScreen';
import { OptionsScreen } from 'screens/OptionsScreen';
// import { useSelector } from 'react-redux';

export const Main = () => {
  const isAuthenticated = true;
  // const isAuthenticated = useSelector(
  //   store => store.user.user.accessToken != null,
  // );

  return (
    <BrowserRouter>
      {!isAuthenticated && (
        <Routes>
          <Route path="*" element={<LoginScreen />} />
        </Routes>
      )}
      {isAuthenticated && (
        <Container>
          <Header />
          <Content>
            <MenuBar />
            <MainContainer>
              <Routes>
                <Route path="/mails" element={<InboxScreen />} />
                <Route path="/persons" element={<PersonsDbScreen />} />
                <Route path="/files" element={<FilesDbScreen />} />
                <Route path="/finalreport" element={<FinalReportScreen />} />
                <Route path="/options" element={<OptionsScreen />} />
                <Route path="/telephone" element={<TelephoneScreen />} />
              </Routes>
            </MainContainer>
          </Content>
        </Container>
      )}
    </BrowserRouter>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
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

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
`;

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
        <>
          <Header />
          <Content>
            <MenuBarWrapper>
              <MenuBar />
            </MenuBarWrapper>
            <MainContainer>
              <Routes>
                <Route path="/mails" element={<InboxScreen />} />
                <Route path="/persons" element={<PersonsDbScreen />} />
                <Route path="/files" element={<FilesDbScreen />} />
                <Route path="/finalreport" element={<div>Final Report</div>} />
                <Route path="/telephone" element={<TelephoneScreen />} />
              </Routes>
            </MainContainer>
          </Content>
        </>
      )}
    </BrowserRouter>
  );
};

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

const MainContainer = styled.main`
  width: 100%;
  height: 100%;
`;

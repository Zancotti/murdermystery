import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFileSearch,
  faUsers,
  faFileSignature,
} from '@fortawesome/pro-solid-svg-icons';
import { MenuButton } from './MenuButton';
import { useDispatch, useSelector } from 'react-redux';
import { screen } from 'reducers/screen';
import { screens } from 'constants/screens';
import { accent } from 'styles/colors';

export const MenuSidebar = () => {
  const dispatch = useDispatch();
  const initialScreen = useSelector(store => store.screen.currentScreen);
  const [selectedMenuItem, setSelectedMenuItem] = useState(initialScreen);

  useEffect(() => {
    if (selectedMenuItem)
      dispatch(screen.actions.setScreen({ screen: selectedMenuItem }));
  }, [selectedMenuItem, dispatch]);

  return (
    <Container>
      <MenuButton
        onClick={() => {
          setSelectedMenuItem(screens.Inbox);
        }}
        title="Mail Inbox"
        icon={<FontAwesomeIcon icon={faEnvelope} />}
        isSelected={selectedMenuItem === screens.Inbox}
        displayAmountMessages={true}
      />
      <MenuButton
        onClick={() => {
          setSelectedMenuItem(screens.PersonsDB);
        }}
        title="Person Database"
        icon={<FontAwesomeIcon icon={faUsers} />}
        isSelected={selectedMenuItem === screens.PersonsDB}
      />
      <MenuButton
        onClick={() => {
          setSelectedMenuItem(screens.FilesDB);
        }}
        title="File Database"
        icon={<FontAwesomeIcon icon={faFileSearch} />}
        isSelected={selectedMenuItem === screens.FilesDB}
      />
      <MenuButton
        onClick={() => {
          setSelectedMenuItem(screens.FinalReport);
        }}
        title="Final Report"
        icon={<FontAwesomeIcon icon={faFileSignature} />}
        isSelected={selectedMenuItem === screens.FinalReport}
      />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 10px;
  padding: 10px 0;
  font-size: 30px;
  width: 70px;
  height: 100%;
  background-color: ${accent};
  @media (max-width: 667px) {
    flex-direction: row;
    width: 100%;
    height: 40px;
    font-size: 20px;
    padding: 0;
    justify-content: space-evenly;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: row;
    width: 100%;
    font-size: 20px;
    height: 60px;
    padding: 0;
    justify-content: space-evenly;
  }
`;

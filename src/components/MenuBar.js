import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFileSearch,
  faUsers,
  faFileSignature,
  faSlidersV,
} from '@fortawesome/pro-solid-svg-icons';
import { MenuButton } from './MenuButton';
import { accent } from 'styles/colors';
import { useNavigate, useLocation } from 'react-router-dom';

export const MenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <MenuButton
        onClick={() => {
          navigate('/mails');
        }}
        title="Mail Inbox"
        icon={<FontAwesomeIcon icon={faEnvelope} />}
        isSelected={location.pathname === '/mails'}
        displayAmountMessages={true}
      />
      <MenuButton
        onClick={() => {
          navigate('/persons');
        }}
        title="Person Database"
        icon={<FontAwesomeIcon icon={faUsers} />}
        isSelected={location.pathname === '/persons'}
      />
      <MenuButton
        onClick={() => {
          navigate('/files');
        }}
        title="File Database"
        icon={<FontAwesomeIcon icon={faFileSearch} />}
        isSelected={location.pathname === '/files'}
      />
      <MenuButton
        onClick={() => {
          navigate('/finalreport');
        }}
        title="Final Report"
        icon={<FontAwesomeIcon icon={faFileSignature} />}
        isSelected={location.pathname === '/finalreport'}
      />
      <MenuButton
        onClick={() => {
          navigate('/options');
        }}
        title="Options"
        icon={<FontAwesomeIcon icon={faSlidersV} />}
        isSelected={location.pathname === '/options'}
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
  min-height: 100vh;
  background-color: ${accent};
  @media (max-width: 667px) {
    flex-direction: row;
    width: 100%;
    min-height: 60px;
    height: 60px;
    font-size: 20px;
    justify-content: space-evenly;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: row;
    width: 100%;
    min-height: 60px;
    font-size: 20px;
    height: 60px;
    justify-content: space-evenly;
  }
`;

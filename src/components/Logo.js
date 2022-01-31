import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => {
  return (
    <LogoContainer>
      <PrimaryLogo>
        <FontAwesomeIcon icon={faBookDead} />
      </PrimaryLogo>
      Murder
      <SecondaryLogo>Mystery</SecondaryLogo>
    </LogoContainer>
  );
};

const LogoContainer = styled.h1`
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  @media (max-width: 667px) {
    font-size: 18px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

const PrimaryLogo = styled.span`
  font-size: 25px;
  font-weight: 900;
  @media (max-width: 667px) {
    font-size: 21px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 23px;
  }
`;

const SecondaryLogo = styled.span`
  font-weight: 400;
`;

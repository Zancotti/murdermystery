import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPoliceTie } from '@fortawesome/pro-duotone-svg-icons';

export const Logo = () => {
  return (
    <LogoContainer>
      <PrimaryLogo>
        <FontAwesomeIcon icon={faUserPoliceTie} />
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
`;

const PrimaryLogo = styled.span`
  margin-right: 4px;
  font-size: 25px;
  font-weight: 900;
`;

const SecondaryLogo = styled.span`
  font-weight: 400;
`;

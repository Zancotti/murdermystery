import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead } from '@fortawesome/free-solid-svg-icons';

export const Logotype = () => {
  return (
    <LogotypeContainer>
      <LogotypeHeader>
        <PrimaryLogo>
          <FontAwesomeIcon icon={faBookDead} />
          Murder
        </PrimaryLogo>
        <SecondaryLogo>Mystery</SecondaryLogo>
      </LogotypeHeader>
      <IntroText>
        MurderMystery is an online game where you are put into the shoes of a
        criminal investigator tasked with solving a fictional crime. Log in to
        the police network to start the investigation.
      </IntroText>
    </LogotypeContainer>
  );
};

const LogotypeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: #f4f6f8;
  padding: 10px;
`;

const LogotypeHeader = styled.h1`
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  font-size: 25px;
`;

const PrimaryLogo = styled.span`
  font-weight: 900;
`;

const SecondaryLogo = styled.span`
  font-weight: 400;
`;

const IntroText = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

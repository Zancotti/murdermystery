import React from 'react';
import styled from 'styled-components';
import { Logo } from 'components';

export const LoginHeader = () => {
  return (
    <LogotypeContainer>
      <LogoContainer>
        <Logo />
      </LogoContainer>
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const IntroText = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

import React from 'react';
import styled from 'styled-components/macro';
import { lightGrey } from 'styles/colors';

export const OptionsScreen = () => {
  return (
    <Container>
      <Content>
        <button></button>
        <button></button>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  background-color: ${lightGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: 667px) {
    flex-direction: column;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
    padding: 10px 10px 70px 10px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 30%;
  padding: 18px;
  display: grid;
  grid-template-rows: auto 1fr auto 1fr;
`;

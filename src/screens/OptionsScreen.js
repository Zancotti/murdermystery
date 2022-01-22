import React from 'react';
import styled from 'styled-components/macro';
import { lightGrey } from 'styles/colors';
import { Button } from 'components/Button';

export const OptionsScreen = () => {
  return (
    <Container>
      <Content>
        <Header>Options</Header>
        <Button onClick={() => console.log('text')} text="Save" />
        <Button onClick={() => console.log('text')} text="Restart" />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  @media (max-width: 667px) {
    flex-direction: column;
    padding-bottom: 70px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
    padding-bottom: 70px;
  }
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  min-height: 100vh;
  @media (max-width: 667px) {
    margin: 0px;
    border-radius: 0;
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
    margin: 0px;
    border-radius: 0;
  }
`;

const Header = styled.h1`
  margin: 0 0 10px 0;
  font-size: 25px;
`;

import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lightGrey } from 'styles/colors';
import { Button, Container } from 'components';
import { files, persons, inbox } from 'reducers';

export const OptionsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restartGame = () => {
    dispatch(files.actions.reset());
    dispatch(persons.actions.reset());
    dispatch(inbox.actions.reset());
    navigate('/mails');
  };

  return (
    <Container>
      <Content>
        <h1>Options</h1>
        <Button onClick={() => console.log('text')} text="Save" />
        <Button onClick={() => restartGame()} text="Restart" />
      </Content>
    </Container>
  );
};

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  padding: 10px;
  min-height: 100%;
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

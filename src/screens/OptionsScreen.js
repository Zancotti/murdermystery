import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lightGrey } from 'styles/colors';
import { Button, Container, DialogComponent } from 'styledComponents';
import { files, persons, inbox, user } from 'reducers';
import { API_URL } from 'utils/urls';
import axios from 'axios';

export const OptionsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObject = useSelector(state => state.user.user);
  const isGuest = userObject.email === 'guest@guest.com';
  const fileReducerContent = useSelector(state => state.files);
  const triggeredEvents = useSelector(state => state.inbox.triggeredEvents);
  const mailList = useSelector(state => state.inbox.mailList);
  const accessedPersonList = useSelector(
    state => state.persons.accessedPersonList,
  );
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    isSuccess: false,
    text: '',
  });

  const restartGame = () => {
    batch(() => {
      dispatch(files.actions.reset());
      dispatch(persons.actions.reset());
      dispatch(inbox.actions.reset());
    });
    navigate('/mails');
  };

  const logout = () => {
    batch(() => {
      dispatch(files.actions.reset());
      dispatch(persons.actions.reset());
      dispatch(inbox.actions.reset());
      dispatch(user.actions.setInitialUser());
    });
  };

  const saveGame = () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: userObject.accessToken,
    };

    const body = {
      accessedFileList: fileReducerContent.accessedFileList,
      triggeredEvents: triggeredEvents,
      mailList: mailList,
      accessedPersonList: accessedPersonList,
      userEmail: userObject.email,
    };

    axios.post(API_URL('save'), body, { headers }).then(res => {
      if (res.data.success) {
        setModalState({
          isOpen: true,
          isSuccess: true,
          text: 'You successfully saved your game!',
        });
      } else {
        setModalState({
          isOpen: true,
          isSuccess: false,
          text: 'Oh no! There was an error saving your game. Try again later!',
        });
      }
    });
  };

  return (
    <Container>
      <Content>
        <h1>Options</h1>
        Logged in as {isGuest ? 'Guest Player' : userObject.email}
        {!isGuest && <Button onClick={() => saveGame()} text="Save" />}
        <Button onClick={() => restartGame()} text="Restart" />
        <Button onClick={() => logout()} text="Logout" />
        <h3>About the game</h3>
        <span>
          This online game was made by{' '}
          <a
            href="https://github.com/zancotti"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sabrina Zancotti
          </a>{' '}
          as my final project for the Technigo frontend developer bootcamp
          2021/2022.
        </span>
        <p>
          The frontend of MurderMystery was developed in React JS and Redux. The
          backend was developed in Node.js using Express API and Mongoose and
          MongoDB for the database.
        </p>
        <span>
          All images of people are from the website{' '}
          <a
            href="https://this-person-does-not-exist.com/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            this-person-does-not-exist.com
          </a>{' '}
          and is an AI generated image.
        </span>
      </Content>
      <DialogComponent
        text={modalState.text}
        isOpen={modalState.isOpen}
        isSuccess={modalState.isSuccess}
        onDismiss={() => setModalState({ isOpen: false })}
      />
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

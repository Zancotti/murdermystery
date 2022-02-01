import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { lightGrey } from 'styles/colors';
import { Button, Container } from 'styledComponents';
import { files, persons, inbox, user } from 'reducers';
import { API_URL } from 'utils/urls';

export const OptionsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userObject = useSelector(state => state.user.user);
  const isGuest = user.email === 'guest@guest.com';

  const fileReducerContent = useSelector(state => state.files);
  const triggeredEvents = useSelector(state => state.inbox.triggeredEvents);
  const accessedPersonList = useSelector(
    state => state.persons.accessedPersonList,
  );

  const restartGame = () => {
    batch(() => {
      dispatch(files.actions.reset());
      dispatch(persons.actions.reset());
      dispatch(inbox.actions.reset());
    });
    navigate('/mails');
  };

  const logout = () => {
    dispatch(user.actions.setInitialUser());
  };

  const saveGame = () => {
    console.log('AccessedFileList', fileReducerContent.accessedFileList);
    console.log('triggeredEvents', triggeredEvents);
    console.log('AccessedPERSON', accessedPersonList);
    console.log('userEmail', userObject.email);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.accessToken,
      },

      body: JSON.stringify({
        accessedFileList: fileReducerContent.accessedFileList,
        triggeredEvents: triggeredEvents,
        accessedPersonList: accessedPersonList,
        userEmail: userObject.email,
      }),
    };

    fetch(API_URL('save'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log('sucess');
        } else {
          console.log('not sucess');
        }
      });
  };

  return (
    <Container>
      <Content>
        <h1>Options</h1>
        {!isGuest && <Button onClick={() => saveGame()} text="Save" />}
        <Button onClick={() => restartGame()} text="Restart" />
        <Button onClick={() => logout()} text="Logout" />
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

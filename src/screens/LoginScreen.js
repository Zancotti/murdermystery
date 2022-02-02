import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import backgroundImage from '../Images/police.jpg';
import { Button, Input } from 'styledComponents';
import { LoginHeader } from 'components';
import { useSafeDispatch } from 'hooks';
import { API_URL } from 'utils/urls';
import { user, files, persons, inbox } from 'reducers';
import { batch, useDispatch } from 'react-redux';
import axios from 'axios';

const getHeader = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

const getBody = (email, password) => {
  return {
    email: email,
    password: password,
  };
};

export const LoginScreen = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 420px)' });
  const dispatch = useSafeDispatch();
  const unsafeDispatch = useDispatch();
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [actionType, setActionType] = useState('');
  const [error, setError] = useState('');
  const handleSubmitForm = event => {
    event.preventDefault();
    onSignUpLogInButtonClick();
  };

  const onLoad = user => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: user.accessToken,
    };
    const body = {
      userEmail: user.email,
    };

    axios
      .post(API_URL('load'), body, { headers })
      .then(res => {
        if (!res.data.success) return;
        const {
          accessedFileList,
          accessedPersonList,
          mailList,
          triggeredEvents,
        } = res.data.content;
        batch(() => {
          unsafeDispatch(
            files.actions.setAccessedFileList({ accessedFileList }),
          );
          unsafeDispatch(
            persons.actions.setAccessedPersonList({ accessedPersonList }),
          );
          unsafeDispatch(
            inbox.actions.setMailList({ mailList, skipTimeUpdate: true }),
          );
          unsafeDispatch(inbox.actions.setTriggeredEvents({ triggeredEvents }));
        });
      })
      .finally(() => {
        navigate('/mails');
      });
  };

  const onSignUpLogInButtonClick = () => {
    const header = getHeader();
    const body = getBody(loginDetails.email, loginDetails.password);

    console.log(API_URL(actionType));
    axios.post(API_URL(actionType), body, { header }).then(res => {
      if (res.data.success) {
        dispatch(user.actions.setUser(res.data.content));
        onLoad(res.data.content);
      } else {
        dispatch(user.actions.setInitialUser());
        if (actionType === 'signup') {
          setError(
            'Could not sign up. If you like to log in using an existing account please press log in!',
          );
          setActionType('');
        } else {
          setError(
            'Could not log in. If you like to create a new account please press sign up!',
          );
        }
      }
    });
  };

  const onGuestButtonClick = () => {
    const header = getHeader();
    const body = getBody('guest@guest.com', 'guest');

    axios.post(API_URL(''), body, { header }).then(res => {
      if (res.data.success) {
        dispatch(user.actions.setUser(res.data.content));
        navigate('/mails');
      } else {
        dispatch(user.actions.setInitialUser());
        setError('Could not log in as a guest right now, try again later!');
      }
    });
  };

  return (
    <Main>
      {!isMobile && <Image></Image>}
      <RightColumn>
        <Container>
          <LoginHeader />
          <LoginForm onSubmit={handleSubmitForm}>
            <Input
              required={true}
              type={'email'}
              placeholder={'Email'}
              onChange={event =>
                setLoginDetails({
                  ...loginDetails,
                  email: event.target.value.toLowerCase(),
                })
              }
            />
            <Input
              required={true}
              type={'password'}
              placeholder={'Password'}
              minLength={5}
              onChange={event =>
                setLoginDetails({
                  ...loginDetails,
                  password: event.target.value,
                })
              }
            />
            <ButtonContainer>
              <Button text="Log in" onClick={() => setActionType('')} />
              <Button text="Sign up" onClick={() => setActionType('signup')} />
            </ButtonContainer>
          </LoginForm>
          <Button text="Log in as guest" onClick={onGuestButtonClick} />
          {error && <ErrorContainer>{error}</ErrorContainer>}
        </Container>
      </RightColumn>
    </Main>
  );
};

const Main = styled.main`
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Image = styled.div`
  height: 100%;
  background-image: url(${backgroundImage});
  opacity: 0.2;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const RightColumn = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: #00a48a;
  @media (max-width: 760px) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto auto auto;
  width: 375px;
  padding: 10px 10px 10px;
  @media (max-width: 760px) {
    width: 100%;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
`;

const ErrorContainer = styled.div`
  background-color: #f4f6f8;
  width: 100%;
  padding 10px;
`;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../Images/police.jpg';
import { useMediaQuery } from 'react-responsive';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import { Button } from 'components/Button';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
  const [actionType, setActionType] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 420px)' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmitForm = event => {
    event.preventDefault();
    onSignUpLogInButtonClick();
  };

  const onSignUpLogInButtonClick = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginDetails.email,
        password: loginDetails.password,
      }),
    };

    fetch(API_URL(actionType), options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.success) {
          dispatch(user.actions.setUser(data.response));
          navigate('/mails');
        } else {
          dispatch(user.actions.setInitialUser());
          if (actionType === 'login') {
            setError(
              'Could not sign up. If you like to log in using an existing account please press log in!',
            );
            setActionType('');
          } else {
            setError(
              'Could not log in. If you like to create a new account please press sign up!',
            );
            setActionType('');
          }
        }
      });
  };

  const onGuestButtonClick = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'guest@guest.com',
        password: 'guest',
      }),
    };

    fetch(API_URL('signin'), options)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          dispatch(user.actions.setUser(data.response));
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
          <LogotypeContainer>
            <Logotype>
              <PrimaryLogo>
                <FontAwesomeIcon icon={faBookDead} />
                Murder
              </PrimaryLogo>
              <SecondaryLogo>Mystery</SecondaryLogo>
            </Logotype>
            <IntroText>
              MurderMystery is an online game where you are put into the shoes
              of a criminal investigator tasked with solving a fictional crime.
              Log in to the police network to start the investigation.
            </IntroText>
          </LogotypeContainer>

          <LoginDetails onSubmit={handleSubmitForm}>
            <EmailInput
              required={true}
              type="email"
              placeholder="Email"
              onChange={event =>
                setLoginDetails({
                  ...loginDetails,
                  email: event.target.value.toLowerCase(),
                })
              }
            ></EmailInput>
            <PasswordInput
              required={true}
              minLength={5}
              type="password"
              placeholder="Password"
              onChange={event =>
                setLoginDetails({
                  ...loginDetails,
                  password: event.target.value,
                })
              }
            ></PasswordInput>
            <ButtonContainer>
              <Button text="Log in" onClick={() => setActionType('')} />
              <Button text="Sign up" onClick={() => setActionType('signup')} />
            </ButtonContainer>
          </LoginDetails>
          <Button text="Log in as guest" onClick={onGuestButtonClick} />
          {error && <ErrorContainer>{error}</ErrorContainer>}
        </Container>
      </RightColumn>
    </Main>
  );
};

const ErrorContainer = styled.div`
  background-color: #f4f6f8;
  width: 100%;
  padding 10px;
`;

const Main = styled.main`
  height: 100vh;
  min-height: 667px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: black;
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
  background-color: #00a48a;
  @media (max-width: 420px) {
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
  @media (max-width: 420px) {
    width: 100%;
  }
`;

const LogotypeContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: #f4f6f8;
  padding: 10px;
`;

const Logotype = styled.h1`
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

const LoginDetails = styled.form`
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  margin: 10px 0px;
  padding: 5px;
`;

const PasswordInput = styled.input`
  padding: 5px;
`;

const ButtonContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 5px;
`;

import React, { useState } from 'react';
import styled from 'styled-components/macro';
import iphone from '../Images/iphone.png';
import { lightGrey, accent, white } from 'styles/colors';
import { useNavigate } from 'react-router-dom';
import { inbox } from 'reducers';
import { useSafeDispatch } from 'hooks';
import { batch } from 'react-redux';

export const TelephoneScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [passcodeGuess, setPasscodeGuess] = useState('');
  const [guessedCorrect, setGuessedCorrect] = useState(false);
  const navigate = useNavigate();
  const dispatch = useSafeDispatch();

  return (
    <Container>
      <TelephoneForm
        onSubmit={event => {
          event.preventDefault();
          if (passcodeGuess === '1987') {
            setGuessedCorrect(true);
            setPasscodeGuess('');
            batch(() => {
              dispatch(
                inbox.actions.addTriggeredEvent({
                  event: 'telephoneUnlocked',
                }),
              );
              dispatch(
                inbox.actions.setSelectedMail({
                  selectedMail: null,
                }),
              );
            });
            setTimeout(() => {
              navigate('/mails');
            }, 2000);
          }
        }}
      >
        <Content>
          <PasscodeInput
            type="text"
            onChange={event => setPasscodeGuess(event.target.value)}
            value={passcodeGuess}
            placeholder={guessedCorrect ? 'Access granted' : 'Input 4 digits'}
            disabled={guessedCorrect}
          />

          <Button type="submit" disabled={guessedCorrect}>
            Enter passcode
          </Button>
          <ForgotPasscode
            onClick={() => setIsClicked(isClicked ? false : true)}
          >
            Forgot my passcode
          </ForgotPasscode>
          {isClicked && <Clue>The year I married Lizzie</Clue>}
        </Content>
      </TelephoneForm>
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

const TelephoneForm = styled.form`
  height: 450px;
  width: 200px;
  background-image: url(${iphone});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  text-align: center;
  @media (max-width: 667px) {
    margin-bottom: 60px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    margin-bottom: 60px;
  }
`;

const PasscodeInput = styled.input`
  width: 100%;
  font-size: 12px;
  padding: 5px;

  @media (max-width: 667px) {
    font-size: 15px;
    padding: 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 20px;
    padding: 10px;
  }
`;

const Button = styled.button`
  margin: 5px 0;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 4px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 16%) 0px 1px 4px;
  background-color: white;
  @media (max-width: 667px) {
    width: 100%;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
  }
`;

const ForgotPasscode = styled.div`
  width: 100%;
  font-size: 10px;
  cursor: pointer;
  background-color: ${accent};
  padding: 2px;
  border-radius: 2px;
  color: ${white};
`;

const Clue = styled(ForgotPasscode)`
  color: black;
  cursor: none;
  margin-top: 4px;
  background-color: ${lightGrey};
`;

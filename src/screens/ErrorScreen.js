import React from 'react';
import styled from 'styled-components/macro';
import Lottie from 'react-lottie';
import animationData from '../lotties/error.json';
import { useMediaQuery } from 'react-responsive';
import { lightGrey } from 'styles/colors';

export const ErrorScreen = () => {
  const isMobile = useMediaQuery({ query: '(max-width:667px)' });
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <ErrorContainer>
      {isMobile && (
        <Lottie
          options={defaultOptions}
          height={100}
          width={100}
          style={{ marginTop: '20px' }}
        />
      )}
      {!isMobile && (
        <Lottie options={defaultOptions} height={250} width={250} />
      )}
      <ErrorText>
        Something went wrong with the request to the backend, please try again
        later!
      </ErrorText>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.section`
  background-color: ${lightGrey};
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  padding: 15px;
  font-size: 15px;
  text-align: center;
  max-width: 400px;
`;

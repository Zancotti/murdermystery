import React from 'react';
import styled from 'styled-components/macro';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';

export const DialogComponent = ({ text, isSuccess, isOpen, onDismiss }) => {
  return (
    <Dialog
      aria-label={`Dialog with content: ${text}`}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <Container>
        <Icon isSuccess={isSuccess}>
          <FontAwesomeIcon icon={isSuccess ? faCheckCircle : faStopCircle} />
        </Icon>
        {text}
      </Container>
    </Dialog>
  );
};

const Container = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  @media (max-width: 667px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Icon = styled.span`
  color: ${props => (props.isSuccess ? 'darkgreen' : 'darkred')};
`;

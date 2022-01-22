import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { white } from 'styles/colors';

export const BackButton = ({ onClick }) => {
  return (
    <ButtonBack onClick={onClick}>
      <Icon>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Icon>
      <Text>Back</Text>
    </ButtonBack>
  );
};

const ButtonBack = styled.div`
  background-color: #36a9ae;
  background-image: linear-gradient(#37adb2, #329ca0);
  border: 1px solid #2a8387;
  font-family: -apple-system, '.SFNSDisplay-Regular', 'Helvetica Neue',
    Helvetica, Arial, sans-serif;
  font-size: 17px;
  line-height: 100%;
  color: ${white};
  cursor: pointer;
  display: flex;
  padding: 4px;
  outline: 0;
  padding: 11px 15px 12px;
  transition: box-shadow 0.05s ease-in-out, opacity 0.05s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  margin: 0 0 10px 0;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 16%) 0px 1px 4px;
  &:hover {
    box-shadow: rgba(255, 255, 255, 0.3) 0 0 2px inset,
      rgba(0, 0, 0, 0.4) 0 1px 2px;
    text-decoration: none;
    transition-duration: 0.15s, 0.15s;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0 2px 4px inset,
      rgba(0, 0, 0, 0.4) 0 1px 1px;
  }
`;

const Icon = styled.div`
  font-size: 25px;
  color: ${white};
  margin-right: 10px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
`;

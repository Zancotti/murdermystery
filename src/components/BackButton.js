import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { accent } from 'styles/colors';

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
  display: flex;
  padding: 4px;
  margin: 0 0 10px 0;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 16%) 0px 1px 4px;
  background-color: white;
`;

const Icon = styled.div`
  font-size: 25px;
  color: ${accent};
  margin-right: 10px;
`;

const Text = styled.span`
  display: flex;
  align-items: center;
`;

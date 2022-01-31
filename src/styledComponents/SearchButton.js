import React from 'react';
import styled from 'styled-components/macro';
import { white, accent } from 'styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const SearchButton = () => {
  return (
    <Submit>
      <FontAwesomeIcon icon={faSearch} />
    </Submit>
  );
};

const Submit = styled.button`
  background-color: ${accent};
  color: ${white};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: 1px solid ${accent};
  outline: none;
  font-size: 20px;
  padding: 0 18px;
`;

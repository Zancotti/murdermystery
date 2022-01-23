import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchButton } from './Article';
import { white } from 'styles/colors';

export const SearchInputContainer = ({ value, onChange, handleSubmit }) => {
  return (
    <InputContainer>
      <IconContainer>
        <FontAwesomeIcon icon={faSearch} />
      </IconContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search"
          type="text"
          value={value}
          onChange={onChange}
        />
        <SearchButton />
      </Form>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${white};
`;

const IconContainer = styled.div`
  font-size: 22px;
  color: #7e7b7c;
  margin: 0 10px;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Input = styled.input`
  background-color: ${white};
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s all;
  outline: none;
  border: none;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
  }
  @media (max-width: 667px) {
    font-size: 18px;
    &::placeholder {
      font-size: 18px;
    }
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 18px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;

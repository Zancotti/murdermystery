import React from 'react';
import styled from 'styled-components/macro';
import { white } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { persons } from 'reducers/persons';

import { BackButton } from './BackButton';
export const PersonDetails = ({ selectedPerson }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const dispatch = useDispatch();
  return (
    <PersonDetailsContainer>
      {isTabletOrMobile && (
        <BackButton
          onClick={() => {
            dispatch(
              persons.actions.setSelectedPerson({ selectedPerson: null }),
            );
          }}
        />
      )}

      <span>{selectedPerson.id}</span>
      <span>{selectedPerson.firstName}</span>
      <span>{selectedPerson.lastName}</span>
      <span>{selectedPerson.age}</span>
    </PersonDetailsContainer>
  );
};

const PersonDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: ${white};
  border-radius: 10px;
  margin: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

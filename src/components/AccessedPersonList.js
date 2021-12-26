import React from 'react';
import styled from 'styled-components/macro';
import { FindSearchItem } from './FindSearchItem';
import { useDispatch } from 'react-redux';
import { persons } from 'reducers/persons';

export const AccessedPersonsList = ({ accessedPersonList, selectedPerson }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <h2>Accessed Persons</h2>
      {accessedPersonList.map(person => {
        return (
          <FindSearchItem
            key={person.id}
            onClick={() =>
              dispatch(
                persons.actions.setSelectedPerson({
                  selectedPerson: person,
                }),
              )
            }
            item={person}
            selectedItem={selectedPerson}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  @media (max-width: 667px) {
    padding-bottom: 30px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    padding-bottom: 30px;
  }
`;

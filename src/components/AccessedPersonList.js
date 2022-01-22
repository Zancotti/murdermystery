import React from 'react';
import { FindSearchItem } from './FindSearchItem';
import { useDispatch } from 'react-redux';
import { persons } from 'reducers/persons';

export const AccessedPersonsList = ({ accessedPersonList, selectedPerson }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Accessed Persons</h2>
      {accessedPersonList.map(person => {
        return (
          <FindSearchItem
            key={person._id}
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
    </div>
  );
};

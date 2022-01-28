import React from 'react';
import { useDispatch } from 'react-redux';
import { FindSearchItem, persons, useSafeDispatch } from './Article';

export const AccessedPersonsList = ({ accessedPersonList, selectedPerson }) => {
  const unsafeDispatch = useDispatch();
  const dispatch = useSafeDispatch(unsafeDispatch);
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

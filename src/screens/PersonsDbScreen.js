import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, batch } from 'react-redux';
import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { lightGrey } from 'styles/colors';
import { persons, inbox } from 'reducers';
import { PersonDetails, FindSearchItem, AccessedItemList } from 'components';
import { Container } from 'styledComponents';
import { SearchInputContainer } from 'components';
import { API_URL } from 'utils/urls';
import { useSafeSet, useSafeDispatch } from 'hooks';
import { useAuthenticatedFetch } from 'hooks';

export const PersonsDbScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [searchString, setSearchString] = useState('');
  const [nameOnSubmit, setNameOnSubmit] = useState(null);
  const [isLoading, setIsLoading] = useSafeSet(false);
  const dispatch = useSafeDispatch();
  const navigate = useNavigate();
  const accessedPersonList = useSelector(
    state => state.persons.accessedPersonList,
  );
  const personSearchResult = useSelector(
    state => state.persons.personSearchResult,
  );
  const selectedPerson = useSelector(state => state.persons.selectedPerson);
  const personListDispatch = useCallback(
    data => persons.actions.setPersonList({ personList: data }),
    [],
  );
  const { dataList, error } = useAuthenticatedFetch(
    API_URL('persons'),
    state => state.persons.personList,
    personListDispatch,
  );

  if (error) {
    navigate('/error');
  }

  useEffect(() => {
    if (!nameOnSubmit) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return;
    }

    const person = dataList.find(
      person =>
        person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase() ===
        nameOnSubmit.toLowerCase(),
    );
    dispatch(persons.actions.setPersonSearchResult({ person }));

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [nameOnSubmit, accessedPersonList, dataList, dispatch, setIsLoading]);

  const handleSubmit = event => {
    event.preventDefault();
    if (searchString === '') {
      return;
    }

    if (nameOnSubmit === searchString) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }

    setIsLoading(true);
    setNameOnSubmit(searchString);
    setSearchString('');
  };

  return (
    <Container>
      {(!selectedPerson || !isTabletOrMobile) && (
        <SearchContainer>
          <h1>Person Database</h1>
          <SearchInputContainer
            handleSubmit={handleSubmit}
            value={searchString}
            onChange={event => setSearchString(event.target.value)}
            isLoading={isLoading}
            hasSubmitted={Boolean(nameOnSubmit)}
            hasFoundMatch={Boolean(personSearchResult)}
          />

          {personSearchResult && !isLoading && (
            <FindSearchItem
              onClick={() => {
                batch(() => {
                  dispatch(
                    persons.actions.setSelectedPerson({
                      selectedPerson: personSearchResult,
                    }),
                  );
                  dispatch(
                    persons.actions.addAccessedPerson({
                      person: personSearchResult,
                    }),
                  );
                  if (personSearchResult.triggersEvent) {
                    dispatch(
                      inbox.actions.addTriggeredEvent({
                        event: personSearchResult.triggersEvent,
                      }),
                    );
                  }
                });
              }}
              item={personSearchResult}
              selectedItem={selectedPerson}
            />
          )}

          {accessedPersonList.length !== 0 && (
            <AccessedItemList
              accessedItemList={accessedPersonList}
              selectedItem={selectedPerson}
              title="Accessed Persons"
              onItemClick={person =>
                dispatch(
                  persons.actions.setSelectedPerson({
                    selectedPerson: person,
                  }),
                )
              }
            />
          )}
        </SearchContainer>
      )}

      {selectedPerson && <PersonDetails selectedPerson={selectedPerson} />}
    </Container>
  );
};

const SearchContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr 40%;
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  padding: 10px;
  min-height: 100%;
  @media (max-width: 667px) {
    margin: 0px;
    border-radius: 0;
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
    margin: 0px;
    border-radius: 0;
    padding: 10px 10px 70px 10px;
  }
`;

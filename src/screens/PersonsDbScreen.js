import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { lightGrey } from 'styles/colors';
import { persons, PersonDetails, useSafeDispatch } from 'components/Article';
import { FindSearchItem, AccessedPersonsList, inbox } from 'components/Article';
import { API_URL, SearchInputContainer, Container } from 'components/Article';
import { useAuthenticatedFetch } from 'hooks/useAuthenticatedFetch';

export const PersonsDbScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [searchString, setSearchString] = useState('');
  const [nameOnSubmit, setNameOnSubmit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const safeSetIsLoading = useSafeDispatch(setIsLoading);
  const unsafeDispatch = useDispatch();
  const dispatch = useSafeDispatch(unsafeDispatch);
  const personList = useSelector(state => state.persons.personList);
  const accessedPersonList = useSelector(
    state => state.persons.accessedPersonList,
  );
  const personSearchResult = useSelector(
    state => state.persons.personSearchResult,
  );
  const selectedPerson = useSelector(state => state.persons.selectedPerson);
  const personListDispatch = useCallback(
    data => persons.actions.setPersonList({ fileList: data }),
    [],
  );

  useAuthenticatedFetch(
    API_URL('persons'),
    state => state.persons.personList,
    personListDispatch,
  );

  useEffect(() => {
    if (!nameOnSubmit) {
      setTimeout(() => {
        safeSetIsLoading(false);
      }, 2000);

      return;
    }

    const person = personList.find(
      person =>
        person.firstName.toLowerCase() + ' ' + person.lastName.toLowerCase() ===
        nameOnSubmit.toLowerCase(),
    );
    dispatch(persons.actions.setPersonSearchResult({ person }));

    setTimeout(() => {
      safeSetIsLoading(false);
    }, 2000);
  }, [
    nameOnSubmit,
    accessedPersonList,
    personList,
    dispatch,
    safeSetIsLoading,
  ]);

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
            <AccessedPersonsList
              accessedPersonList={accessedPersonList}
              selectedPerson={selectedPerson}
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
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
    margin: 0px;
    border-radius: 0;
  }
`;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { lightGrey, white } from 'styles/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { persons } from 'reducers/persons';
import { Loading } from '../components/Loading';
import { useMediaQuery } from 'react-responsive';
import { PersonDetails } from 'components/PersonDetails';
import { AccessedPersonsList } from 'components/AccessedPersonList';
import { FindSearchItem } from 'components/FindSearchItem';
import { SubmitButton } from 'components/SubmitButton';
import { API_PersonList } from 'utils/urls';

export const PersonsDbScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [searchString, setSearchString] = useState('');
  const [nameOnSubmit, setNameOnSubmit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const personList = useSelector(state => state.persons.personList);
  const accessedPersonList = useSelector(
    state => state.persons.accessedPersonList,
  );
  const personSearchResult = useSelector(
    state => state.persons.personSearchResult,
  );

  const selectedPerson = useSelector(state => state.persons.selectedPerson);

  useEffect(() => {
    fetch(API_PersonList)
      .then(res => res.json())
      .then(data => {
        dispatch(persons.actions.setPersonList({ personList: data }));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!nameOnSubmit) {
      setTimeout(() => {
        setIsLoading(false);
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
      setIsLoading(false);
      if (!person) {
        return;
      }
      dispatch(persons.actions.addAccessedPerson({ person }));
    }, 2000);
  }, [nameOnSubmit, accessedPersonList, personList, dispatch]);

  const handleSubmit = event => {
    event.preventDefault();
    if (searchString === '') {
      return;
    }
    setIsLoading(true);
    setNameOnSubmit(searchString);
    setSearchString('');
  };

  return (
    <Container>
      {(!selectedPerson || !isTabletOrMobile) && (
        <SearchContainer>
          <Header>Person Database</Header>
          <SearchInputContainer>
            <IconContainer>
              <FontAwesomeIcon icon={faSearch} />
            </IconContainer>
            <Form onSubmit={handleSubmit}>
              <NameInput
                placeholder="Search"
                type="text"
                value={searchString}
                onChange={event => setSearchString(event.target.value)}
              ></NameInput>
              <SubmitButton />
            </Form>
          </SearchInputContainer>

          <MatchResult>
            {isLoading && <Loading />}
            {nameOnSubmit && !isLoading && (
              <>{personSearchResult ? 'We found a match' : 'No match found'}</>
            )}
          </MatchResult>

          {personSearchResult && !isLoading && (
            <FindSearchItem
              onClick={() =>
                dispatch(
                  persons.actions.setSelectedPerson({
                    selectedPerson: personSearchResult,
                  }),
                )
              }
              item={personSearchResult}
              selectedItem={selectedPerson}
            />
          )}
          <div></div>
          <div></div>
          <div></div>
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

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 667px) {
    flex-direction: column;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr 40%;
  padding: 10px;
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  margin: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    grid-template-rows: auto auto auto auto 1fr 20%;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

const NameInput = styled.input`
  background-color: white;
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

const Header = styled.h1`
  margin: 0 0 10px 0;
  font-size: 25px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background: ${white};
`;

const IconContainer = styled.div`
  font-size: 22px;
  color: #7e7b7c;
  margin: 0 10px;
`;

const MatchResult = styled.div`
  margin-top: 10px;
  color: #404040;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`;

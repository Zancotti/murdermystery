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
      <Container>
        <Picture></Picture>
        <AttributesContainer>
          <Name>
            {selectedPerson.firstName + ' ' + selectedPerson.lastName + ' '}
            <div>(alias)</div>
          </Name>
          <SocialSecurityNumber>{selectedPerson.id} </SocialSecurityNumber>
          <div>Date of birth</div>
          <div>Place of birth</div>
          <div>Height</div>
          <div>Eyes</div>
          <div>Hair</div>
          <div>Bloodtype</div>
          <div>Identifying marks</div>
        </AttributesContainer>
      </Container>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </Text>
    </PersonDetailsContainer>
  );
};

const PersonDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: 100%;
  background-color: ${white};
  border-radius: 10px;
  margin: 20px 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px;
  }
`;

const Picture = styled.div`
  height: 170px;
  width: 170px;
  background-color: black;
  margin-right: 20px;
`;

const Container = styled.div`
  display: flex;
`;

const AttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const Name = styled.span`
  display: flex;
  font-weight: 700;
  font-size: 20px;
`;
const SocialSecurityNumber = styled.span``;

const Text = styled.span`
  padding-top: 10px;
`;

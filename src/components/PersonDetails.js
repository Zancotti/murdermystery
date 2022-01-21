import React from 'react';
import styled from 'styled-components/macro';
import { white } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { persons } from 'reducers/persons';
import ReactHtmlParser from 'react-html-parser';
import { Base_URL } from 'utils/urls';

import { BackButton } from './BackButton';
export const PersonDetails = ({ selectedPerson }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const dispatch = useDispatch();
  console.log(selectedPerson);
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
        <IMG src={`${Base_URL}/media/persons/${selectedPerson.image}`} />

        <AttributesContainer>
          <Name>
            {selectedPerson.firstName + ' ' + selectedPerson.lastName + ' '}
            <div>{selectedPerson.alias}</div>
          </Name>
          <SocialSecurityNumber>
            Social security number: {selectedPerson.socialSecurityNumber}
          </SocialSecurityNumber>
          <div>Date of birth: {selectedPerson.dateOfBirth}</div>
          <div>Place of birth: {selectedPerson.placeOfBirth}</div>
          <div>Height: {selectedPerson.height}</div>
          <div>Eyecolor: {selectedPerson.eyes}</div>
          <div>Haircolor: {selectedPerson.hair}</div>
          <div>Blood type: {selectedPerson.bloodType}</div>
        </AttributesContainer>
      </Container>
      <Text>{ReactHtmlParser(selectedPerson.info)}</Text>
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

const IMG = styled.img`
  max-height: 150px;
  max-width: 150px;
  height: 150px;
  width: 150px;
  background-color: black;
  margin-right: 20px;
  position: center;
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

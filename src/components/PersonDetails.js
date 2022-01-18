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
            <div>(alias)</div>
          </Name>
          <SocialSecurityNumber>{selectedPerson.id} </SocialSecurityNumber>
          <div>Date of birth</div>
          <div></div>
          <div>Place of birth</div>
          <div>Height</div>
          <div>Eyes</div>
          <div>Hair</div>
          <div>Bloodtype</div>
          <div>Identifying marks</div>
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
  max-height: 170px;
  max-width: 170px;
  height: 170px;
  width: 170px;
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

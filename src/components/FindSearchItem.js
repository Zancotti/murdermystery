import React from 'react';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { white, darkGrey } from 'styles/colors';

export const FindSearchItem = ({ item, selectedItem, onClick }) => {
  return (
    <Container
      onClick={onClick}
      isSelected={selectedItem && selectedItem._id === item._id}
    >
      <FindIcon>
        <FontAwesomeIcon icon={faUser} />
      </FindIcon>
      {item && (
        <FindText>
          {item.firstName && <>{item.firstName + ' ' + item.lastName}</>}
          {item.name && <>{item.name}</>}
        </FindText>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: ${props =>
    props.isSelected ? 'rgba(0, 0, 0, 0.16) 0px 1px 4px' : 'none'};
  background-color: ${props => (props.isSelected ? white : 'none')};
  &:hover {
    background-color: ${white};
  }

  @media (max-width: 667px) {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${white};
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    background-color: ${white};
  }
`;

const FindIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${darkGrey};
`;

const FindText = styled.div`
  margin-left: 10px;
`;

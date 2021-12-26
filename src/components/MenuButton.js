import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { white, black } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

export const MenuButton = ({
  title,
  onClick,
  icon,
  isSelected,
  displayAmountMessages = false,
}) => {
  const numberOfUnreadMessages = useSelector(
    state => state.inbox.mails.filter(mail => mail.unread).length,
  );
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Container
      onClick={onClick}
      isSelected={isSelected}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && !isTabletOrMobile && <HoverText>{title}</HoverText>}
      {icon}
      {displayAmountMessages && numberOfUnreadMessages > 0 && (
        <MessagesContainer>{numberOfUnreadMessages}</MessagesContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-radius: 3px;
  width: 60px;
  height: 60px;
  color: ${props => (props.isSelected ? black : white)};
  background-color: ${props => (props.isSelected ? white : 'transparent')};
  &:hover {
    transition: all 200ms ease-in-out;
    background-color: ${props =>
      !props.isSelected ? 'rgba(250, 250, 250, 0.5)' : white};
  }

  @media (max-width: 667px) {
    width: 30px;
    height: 30px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 40px;
    height: 40px;
  }
`;

const HoverText = styled.div`
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 65px;
  background-color: rgb(29, 28, 43);
  color: white;
  font-size: 16px;
  height: 60px;
  padding: 0 10px;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-right-color: #1d1c2b;
    border-left: 0;
    margin-top: -6px;
    margin-left: -6px;
  }
`;

const MessagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 40px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: red;
  font-size: 12px;
  margin-bottom: 20px;
  color: white;

  @media (max-width: 667px) {
    height: 16px;
    width: 16px;
    left: 18px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    height: 16px;
    width: 16px;
    left: 25px;
  }
`;

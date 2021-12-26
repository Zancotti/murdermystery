import React from 'react';
import { inbox } from 'reducers/inbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { white, accent, darkGrey } from 'styles/colors';
import moment from 'moment';

const getTimeStamp = timeStamp => {
  const today = new Date();
  const dateToCompare = new Date(timeStamp);
  if (dateToCompare.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    return moment(timeStamp).format('HH:mm');
  } else {
    return moment(timeStamp).format('Do MMM');
  }
};

export const MailListItem = ({ mail, selectedMail, isTabletOrMobile }) => {
  const dispatch = useDispatch();
  return (
    <MailListItemContainer
      key={mail.id}
      isSelected={selectedMail && selectedMail.id === mail.id}
      onClick={() => {
        dispatch(inbox.actions.setSelectedMail({ selectedMail: mail }));
      }}
    >
      <UserIconContainer>{mail.picture}</UserIconContainer>
      <NameSubjectContainer>
        <Name>{mail.from}</Name>
        <Subject>{mail.subject}</Subject>
      </NameSubjectContainer>
      <TimeUnreadContainer>
        <Time>{getTimeStamp(mail.timeStamp)}</Time>
        <Unread isUnread={mail.unread}>{mail.unread ? '!' : ''}</Unread>
      </TimeUnreadContainer>
      {isTabletOrMobile && (
        <IconContainer>
          <FontAwesomeIcon icon={faChevronRight} />
        </IconContainer>
      )}
    </MailListItemContainer>
  );
};

const MailListItemContainer = styled.div`
  cursor: pointer;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  margin: 10px;
  padding: 15px;
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

const IconContainer = styled.div`
  margin-left: 10px;
  color: ${accent};
  font-size: 20px;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Subject = styled.div`
  font-weight: 100;
`;

const NameSubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  border-radius: 50%;
  background-color: ${darkGrey};
  margin-right: 10px;
  width: 50px;
  height: 50px;
`;

const TimeUnreadContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  align-items: flex-end;
`;

const Time = styled.div`
  font-weight: 300;
`;

const Unread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${white};
  font-size: 18px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-weight: 300;
  background-color: ${props => (props.isUnread ? accent : 'transparent')};
`;

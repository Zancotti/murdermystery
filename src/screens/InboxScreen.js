import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { lightGrey } from 'styles/colors';
import { MailDetails, MailListItem, Container } from 'components';
import { API_URL } from 'utils/urls';
import { inbox } from 'reducers';
import { useAuthenticatedFetch } from 'hooks';
import { useNavigate } from 'react-router-dom';

export const InboxScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const selectedMail = useSelector(state => state.inbox.selectedMail);
  const triggeredEvents = useSelector(state => state.inbox.triggeredEvents);
  const mailListDispatch = useCallback(
    data => inbox.actions.setMailList({ mailList: data }),
    [],
  );
  const navigate = useNavigate();
  const { dataList, error } = useAuthenticatedFetch(
    API_URL('mails'),
    state => state.inbox.mailList,
    mailListDispatch,
  );

  if (error) {
    navigate('/error');
  }

  const filteredList = dataList.filter(mail =>
    triggeredEvents.includes(mail.event),
  );
  return (
    <Container>
      {(!selectedMail || !isTabletOrMobile) && (
        <MailList>
          <h1>Inbox</h1>
          {filteredList.map(mail => {
            return (
              <MailListItem
                key={mail._id}
                mail={mail}
                selectedMail={selectedMail}
                isTabletOrMobile={isTabletOrMobile}
              />
            );
          })}
        </MailList>
      )}
      {selectedMail && <MailDetails />}
    </Container>
  );
};

const MailList = styled.div`
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  padding: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 10px 10px 60px 10px;
    border-radius: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 10px 10px 60px 10px;
    border-radius: 0;
  }
`;

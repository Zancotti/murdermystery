import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { lightGrey } from 'styles/colors';
import { MailDetails, MailListItem, API_URL } from 'components/Article';
import { inbox, Container } from 'components/Article';

export const InboxScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const selectedMail = useSelector(state => state.inbox.selectedMail);
  const triggeredEvents = useSelector(state => state.inbox.triggeredEvents);
  const loggedInUser = useSelector(state => state.user.user);
  const mailList = useSelector(state => state.inbox.mailList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mailList.length === 0) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: loggedInUser.accessToken,
        },
      };

      fetch(API_URL('mails'), options)
        .then(res => res.json())
        .then(data => {
          console.log('api response', data);
          dispatch(inbox.actions.setMailList({ mailList: data }));
        });
    }
  }, [dispatch, loggedInUser.accessToken, mailList.length]);

  const filteredList = mailList.filter(mail =>
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

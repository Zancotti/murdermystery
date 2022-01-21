import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { lightGrey } from 'styles/colors';
import { MailDetails } from 'components/MailDetails';
import { useMediaQuery } from 'react-responsive';
import { MailListItem } from 'components/MailListItem';
import { API_URL } from 'utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import { inbox } from 'reducers/inbox';

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
  }, [dispatch, loggedInUser.accessToken]);

  const filteredList = mailList.filter(mail =>
    triggeredEvents.includes(mail.event),
  );
  console.log(triggeredEvents);
  return (
    <Container>
      {(!selectedMail || !isTabletOrMobile) && (
        <MailList>
          <Header>Inbox</Header>
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

const Container = styled.section`
  display: flex;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  @media (max-width: 667px) {
    flex-direction: column;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Header = styled.h1`
  margin: 0 0 10px 0;
  font-size: 25px;
`;

const MailList = styled.div`
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 10px 10px 70px 10px;
  }
`;

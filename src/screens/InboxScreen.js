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
  const loggedInUser = useSelector(state => state.user.user);
  const mailList = useSelector(state => state.inbox.mailList);
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, [dispatch, loggedInUser.accessToken]);

  return (
    <Container>
      {(!selectedMail || !isTabletOrMobile) && (
        <MailList>
          {mailList.map(mail => {
            return (
              <MailListItem
                key={mail.id}
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
  @media (max-width: 667px) {
    flex-direction: column;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MailList = styled.div`
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  margin: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

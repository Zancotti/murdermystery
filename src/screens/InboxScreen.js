import React from 'react';
import styled from 'styled-components/macro';
import { lightGrey } from 'styles/colors';
import { MailDetails } from 'components/MailDetails';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { MailListItem } from 'components/MailListItem';

export const InboxScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const mails = useSelector(state => state.inbox.mails);
  const selectedMail = useSelector(state => state.inbox.selectedMail);

  return (
    <Container>
      {(!selectedMail || !isTabletOrMobile) && (
        <MailList>
          {mails.map(mail => {
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

import React from 'react';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { white, darkGrey } from 'styles/colors';
import { inbox } from 'reducers';
import { BackButton } from 'styledComponents';
import { Base_URL } from 'utils/urls';
import { useSafeDispatch } from 'hooks';

export const MailDetails = () => {
  const selectedMail = useSelector(state => state.inbox.selectedMail);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const dispatch = useSafeDispatch();

  return (
    <MailDetailContainer>
      {isTabletOrMobile && (
        <BackButton
          onClick={() => {
            dispatch(inbox.actions.setSelectedMail({ selectedMail: null }));
          }}
        />
      )}
      <MailCreatedAt>
        {moment(selectedMail.timeStamp).format('MMM Do YYYY, HH:mm')}
      </MailCreatedAt>
      <MailSubject>{selectedMail.subject}</MailSubject>
      <MailIconFromContainer>
        <MailIcon src={`${Base_URL}/media/persons/${selectedMail.image}`} />
        <MailFrom>{selectedMail.from}</MailFrom>
      </MailIconFromContainer>
      <MailText>{ReactHtmlParser(selectedMail.text)}</MailText>
    </MailDetailContainer>
  );
};

const MailDetailContainer = styled.section`
  display: grid;
  grid-template-rows: auto auto auto auto 1fr;
  background-color: ${white};
  width: 55%;
  margin: 10px;

  @media (max-width: 667px) {
    width: 100%;
    margin: 0;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    margin: 0;
    padding: 10px 10px 70px 10px;
  }
`;

const MailCreatedAt = styled.span`
  margin-top: 20px;
  color: ${darkGrey};
`;

const MailSubject = styled.span`
  font-weight: 600;
  font-size: 25px;
  padding: 15px 0 20px 0;
`;

const MailIconFromContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${darkGrey};
  padding-bottom: 10px;
`;

const MailIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const MailFrom = styled.span`
  font-weight: 500;
`;

const MailText = styled.span`
  font-weight: 100;
  margin-top: 30px;
`;

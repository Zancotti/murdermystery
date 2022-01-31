import React from 'react';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { white } from 'styles/colors';
import { files } from 'reducers';
import { BackButton } from 'styledComponents';
import { useSafeDispatch } from 'hooks';

export const FileDetails = ({ selectedFile }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const unsafeDispatch = useDispatch();
  const dispatch = useSafeDispatch(unsafeDispatch);

  return (
    <Container>
      {isTabletOrMobile && (
        <BackButton
          onClick={() => {
            dispatch(files.actions.setSelectedFile({ selectedFile: null }));
          }}
        />
      )}
      <h3>{selectedFile.name}</h3>
      <span>{selectedFile.id}</span>
      <span>{ReactHtmlParser(selectedFile.info)}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: ${white};
  border-radius: 10px;
  margin: 10px;
  @media (max-width: 667px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px 10px 60px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px 10px 60px 10px;
  }
`;

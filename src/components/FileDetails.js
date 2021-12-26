import React from 'react';
import styled from 'styled-components/macro';
import { white } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { files } from 'reducers/files';

import { BackButton } from './BackButton';

export const FileDetails = ({ selectedFile }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const dispatch = useDispatch();
  return (
    <Container>
      {isTabletOrMobile && (
        <BackButton
          onClick={() => {
            dispatch(files.actions.setSelectedFile({ selectedFile: null }));
          }}
        />
      )}
      <span>{selectedFile.id}</span>
      <span>{selectedFile.name}</span>
      <span>{selectedFile.content}</span>
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
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

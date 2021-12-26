import React from 'react';
import styled from 'styled-components/macro';
import { FindSearchItem } from './FindSearchItem';
import { useDispatch, useSelector } from 'react-redux';
import { files } from 'reducers/files';

export const AccessedFileList = ({ accessedFileList, selectedFile }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <h2>Accessed Files</h2>
      {accessedFileList.map(file => {
        return (
          <FindSearchItem
            key={file.id}
            onClick={() =>
              dispatch(
                files.actions.setSelectedFile({
                  selectedFile: file,
                }),
              )
            }
            item={file}
            selectedItem={selectedFile}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  overflow-y: scroll;
  max-height: 100%;
  @media (max-width: 667px) {
    padding-bottom: 30px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    padding-bottom: 30px;
  }
`;

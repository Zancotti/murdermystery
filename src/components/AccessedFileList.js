import React from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import { FindSearchItem, files, useSafeDispatch } from './Article';

export const AccessedFileList = ({ accessedFileList, selectedFile }) => {
  const unsafeDispatch = useDispatch();
  const dispatch = useSafeDispatch(unsafeDispatch);

  return (
    <Container>
      <h2>Accessed Files</h2>
      {accessedFileList.map(file => {
        return (
          <FindSearchItem
            key={file._id}
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
  @media (max-width: 667px) {
    padding-bottom: 30px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    padding-bottom: 50px;
  }
`;

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components/macro';
import { useMediaQuery } from 'react-responsive';
import { useSelector, batch } from 'react-redux';
import { lightGrey } from 'styles/colors';
import { files, FindSearchItem, useSafeDispatch } from '../components/Article';
import { AccessedFileList, FileDetails, API_URL } from '../components/Article';
import { SearchInputContainer, Container } from '../components/Article';
import { useAuthenticatedFetch } from 'hooks/useAuthenticatedFetch';
import { useSafeSet } from 'hooks/useSafeSet';

export const FilesDbScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const dispatch = useSafeDispatch();
  const fileList = useSelector(state => state.files.fileList);
  const accessedFileList = useSelector(state => state.files.accessedFileList);
  const fileSearchResult = useSelector(state => state.files.fileSearchResult);
  const selectedFile = useSelector(state => state.files.selectedFile);
  const [searchString, setSearchString] = useState('');
  const [fileIdOnSubmit, setFileIdOnSubmit] = useState(null);
  const [isLoading, setIsLoading] = useSafeSet(false);
  const fileListDispatch = useCallback(
    data => files.actions.setFileList({ fileList: data }),
    [],
  );

  useAuthenticatedFetch(
    API_URL('files'),
    state => state.files.fileList,
    fileListDispatch,
  );

  console.log('fileSearchResult', fileSearchResult);

  useEffect(() => {
    if (!fileIdOnSubmit) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    const file = fileList.find(
      file => file.fileId.toLowerCase() === fileIdOnSubmit.toLowerCase(),
    );
    dispatch(files.actions.setFileSearchResult({ file }));
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [fileIdOnSubmit, accessedFileList, fileList, dispatch, setIsLoading]);

  const handleSubmit = event => {
    event.preventDefault();
    if (searchString === '') {
      return;
    }
    setIsLoading(true);
    if (fileIdOnSubmit === searchString) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
    setFileIdOnSubmit(searchString);
    setSearchString('');
  };

  return (
    <Container>
      {(!selectedFile || !isTabletOrMobile) && (
        <SearchContainer>
          <h1>File Database</h1>
          <SearchInputContainer
            handleSubmit={handleSubmit}
            value={searchString}
            onChange={event => setSearchString(event.target.value)}
            isLoading={isLoading}
            hasSubmitted={Boolean(fileIdOnSubmit)}
            hasFoundMatch={Boolean(fileSearchResult)}
          />

          {fileSearchResult && !isLoading && (
            <FindSearchItem
              item={fileSearchResult}
              selectedItem={selectedFile}
              onClick={() => {
                batch(() => {
                  dispatch(
                    files.actions.setSelectedFile({
                      selectedFile: fileSearchResult,
                    }),
                  );
                  dispatch(
                    files.actions.addAccessedFile({ file: fileSearchResult }),
                  );
                });
              }}
            />
          )}

          {accessedFileList.length !== 0 && (
            <AccessedFileList
              accessedFileList={accessedFileList}
              selectedFile={selectedFile}
            />
          )}
        </SearchContainer>
      )}

      {selectedFile && <FileDetails selectedFile={selectedFile} />}
    </Container>
  );
};

const SearchContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr 40%;
  padding: 10px;
  width: 40%;
  height: 100%;
  min-height: 100%;
  background-color: ${lightGrey};
  border-radius: 10px;
  @media (max-width: 667px) {
    width: 100%;
    border-radius: 0;
    grid-template-rows: auto auto auto auto 1fr 20%;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    border-radius: 0;
    padding: 10px 10px 70px 10px;
  }
`;

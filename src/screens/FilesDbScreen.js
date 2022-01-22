import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { files } from 'reducers/files';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch, batch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Loading } from 'components/Loading';
import { FindSearchItem } from 'components/FindSearchItem';
import { AccessedFileList } from 'components/AccessedFileList';
import { FileDetails } from 'components/FileDetails';
import { lightGrey, white } from 'styles/colors';
import { SearchButton } from 'components/SearchButton';
import { API_URL } from 'utils/urls';

export const FilesDbScreen = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const fileList = useSelector(state => state.files.fileList);
  const [searchString, setSearchString] = useState('');
  const [fileIdOnSubmit, setFileIdOnSubmit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const accessedFileList = useSelector(state => state.files.accessedFileList);
  const fileSearchResult = useSelector(state => state.files.fileSearchResult);
  const selectedFile = useSelector(state => state.files.selectedFile);
  const loggedInUser = useSelector(state => state.user.user);

  console.log('fileSearchResult', fileSearchResult);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: loggedInUser.accessToken,
      },
    };

    fetch(API_URL('files'), options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch(files.actions.setFileList({ fileList: data }));
      });
  }, [dispatch, loggedInUser.accessToken]);

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
  }, [fileIdOnSubmit, accessedFileList, fileList, dispatch]);

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
          <Header>File Database</Header>
          <SearchInputContainer>
            <IconContainer>
              <FontAwesomeIcon icon={faSearch} />
            </IconContainer>
            <Form onSubmit={handleSubmit}>
              <NameInput
                placeholder="Search"
                type="text"
                value={searchString}
                onChange={event => setSearchString(event.target.value)}
              ></NameInput>
              <SearchButton />
            </Form>
          </SearchInputContainer>

          <MatchResult>
            {isLoading && <Loading />}
            {fileIdOnSubmit && !isLoading && (
              <>{fileSearchResult ? 'We found a match' : 'No match found'}</>
            )}
          </MatchResult>

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

const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  @media (max-width: 667px) {
    flex-direction: column;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto auto auto auto 1fr 40%;
  padding: 10px;
  width: 40%;
  height: 100%;
  min-height: 100vh;
  background-color: ${lightGrey};
  border-radius: 10px;
  margin: 10px;
  @media (max-width: 667px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    grid-template-rows: auto auto auto auto 1fr 20%;
    padding: 10px 10px 70px 10px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    grid-template-rows: auto auto auto auto 1fr 20%;
    width: 100%;
    margin: 0;
    border-radius: 0;
    padding: 10px 10px 70px 10px;
  }
`;

const NameInput = styled.input`
  background-color: white;
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s all;
  outline: none;
  border: none;
  font-size: 20px;
  &::placeholder {
    font-size: 20px;
  }
  @media (max-width: 667px) {
    font-size: 18px;
    &::placeholder {
      font-size: 18px;
    }
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 18px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;

const Header = styled.h1`
  margin: 0 0 10px 0;
  font-size: 25px;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background: ${white};
`;

const IconContainer = styled.div`
  font-size: 22px;
  color: #7e7b7c;
  margin: 0 10px;
`;

const MatchResult = styled.div`
  margin-top: 10px;
  color: #404040;
`;

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
`;

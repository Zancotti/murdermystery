import React from 'react';
import styled from 'styled-components/macro';
import { accent } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookDead } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 667px)' });
  return (
    <Container>
      <Logo>
        <PrimaryLogo>
          <FontAwesomeIcon icon={faBookDead} />
        </PrimaryLogo>
        Murder
        <SecondaryLogo>Mystery</SecondaryLogo>
      </Logo>
      {!isMobile && (
        <MadeByContainer>
          A game made by
          <Link
            href="https://github.com/zancotti"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon>
              <FontAwesomeIcon icon={faGithub} />
            </Icon>
            Sabrina Zancotti
          </Link>
        </MadeByContainer>
      )}
    </Container>
  );
};

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0 10px;
  background-color: white;
  border-bottom: 3px solid ${accent};
  @media (max-width: 667px) {
    position: sticky;
    bottom: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    position: sticky;
    bottom: 0;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  @media (max-width: 667px) {
    font-size: 18px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 20px;
  }
`;

const PrimaryLogo = styled.span`
  font-size: 25px;
  font-weight: 900;
  @media (max-width: 667px) {
    font-size: 21px;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    font-size: 23px;
  }
`;

const SecondaryLogo = styled.span`
  font-weight: 400;
`;

const MadeByContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-family: 'Raleway';
  text-align: right;
  padding-right: 12px;
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 600;
  &:hover {
    color: ${accent};
    transition: all 250ms ease-in;
  }
`;

const Icon = styled.span`
  font-size: 16px;
  margin-right: 4px;
`;

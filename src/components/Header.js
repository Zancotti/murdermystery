import React from 'react';
import styled from 'styled-components/macro';
import { accent } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Logo } from 'components';

export const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 667px)' });
  return (
    <Container>
      <Logo />
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

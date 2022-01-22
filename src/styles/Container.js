import styled from 'styled-components/macro';

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;
  @media (max-width: 667px) {
    flex-direction: column;
    padding: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    flex-direction: column;
    padding: 0;
  }
`;

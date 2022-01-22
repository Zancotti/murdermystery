import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { white, lightGrey } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { Button } from 'components/Button';
import { Container } from 'styles/Container';

export const FinalReportScreen = () => {
  const [nameMurderer, setNameMurderer] = useState('');
  const [nameVictim, setNameVictim] = useState('');
  const [nameInheriter, setNameInheriter] = useState('');
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [value, setValue] = useState('');
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  console.log(isSubmitClicked);
  const formOnSubmit = event => {
    event.preventDefault();
    setIsSubmitClicked(true);
  };

  console.log('istabletor mobile', isTabletOrMobile);
  console.log(value);
  console.log('is submit', isSubmitClicked);

  return (
    <Container>
      {((isTabletOrMobile && !isSubmitClicked) || !isTabletOrMobile) && (
        <FinalReport>
          <h1>Final Report</h1>
          {!isSubmitClicked && (
            <Form onSubmit={formOnSubmit}>
              <FindingsSection>
                <TextInput
                  placeholder="Name"
                  type="text"
                  onChange={event => setNameMurderer(event.target.value)}
                  value={nameMurderer}
                  required
                />
                <span>killed</span>
                <TextInput
                  type="text"
                  placeholder="Name"
                  onChange={event => setNameVictim(event.target.value)}
                  value={nameVictim}
                  required
                />
              </FindingsSection>
              <FindingsSection>
                <span>The killer was the victims</span>
                <Select
                  defaultValue={''}
                  required
                  onChange={event => setValue(event.currentTarget.value)}
                >
                  <option value="" disabled>
                    Choose option
                  </option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daugther</option>
                  <option value="Neighbour">Neighbour</option>
                  <option value="Business partner">Business partner</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Friend">Friend</option>
                  <option value="Wife">Wife</option>
                  <option value="Gardener">Gardener</option>
                  <option value="Employee">Other employee</option>
                </Select>
              </FindingsSection>
              <FindingsSection>
                <TextInput
                  placeholder="Name"
                  type="text"
                  onChange={event => setNameInheriter(event.target.value)}
                  value={nameInheriter}
                  required
                />
                <span>will take over the familys company.</span>
              </FindingsSection>
              <Button text="Submit" onClick={() => console.log('submit')} />
            </Form>
          )}
        </FinalReport>
      )}
      {isSubmitClicked && (
        <Conclusion>The feeling is that you got this wrong.....</Conclusion>
      )}
    </Container>
  );
};

const FinalReport = styled.div`
  width: 40%;
  background-color: ${lightGrey};
  border-radius: 10px;
  padding: 10px;
  min-height: 100%;
  height: 100%;

  @media (max-width: 667px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: auto, auto, auto, 1fr;
`;

const FindingsSection = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Select = styled.select`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 120px;
  padding: 5px;
  border: none;
`;

const TextInput = styled.input`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background-color: ${white};
  width: 120px;
  border: none;
  outline: none;
  padding: 5px;
`;

const Conclusion = styled.div`
  margin: 10px;
  padding: 10px;
`;

import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { lightGrey } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { Button, Container, Input } from 'components/Article';

export const FinalReportScreen = () => {
  const [reportDetails, setReportDetails] = useState({
    murderer: '',
    victim: '',
    relationship: '',
    inheriter: '',
  });

  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const formOnSubmit = event => {
    event.preventDefault();
    setIsSubmitClicked(true);
  };

  return (
    <Container>
      {((isTabletOrMobile && !isSubmitClicked) || !isTabletOrMobile) && (
        <FinalReport>
          <h1>Final Report</h1>
          {!isSubmitClicked && (
            <Form onSubmit={formOnSubmit}>
              <FindingsSection>
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={event =>
                    setReportDetails({
                      ...reportDetails,
                      murderer: event.target.value.toLowerCase(),
                    })
                  }
                  value={reportDetails.murderer}
                  required={true}
                />
                <span>killed</span>
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={event =>
                    setReportDetails({
                      ...reportDetails,
                      victim: event.target.value.toLowerCase(),
                    })
                  }
                  value={reportDetails.victim}
                  required={true}
                />
              </FindingsSection>
              <FindingsSection>
                <span>The killer was the victims</span>
                <Select
                  defaultValue={reportDetails.relationship}
                  required
                  onChange={event =>
                    setReportDetails({
                      ...reportDetails,
                      relationship: event.currentTarget.value,
                    })
                  }
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
                <Input
                  type="text"
                  placeholder="Name"
                  onChange={event =>
                    setReportDetails({
                      ...reportDetails,
                      inheriter: event.target.value,
                    })
                  }
                  value={reportDetails.inheriter}
                  required={true}
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
  width: 50%;
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

const Conclusion = styled.div`
  margin: 10px;
  padding: 10px;
`;

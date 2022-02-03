import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { lightGrey, white } from 'styles/colors';
import { useMediaQuery } from 'react-responsive';
import { Button, InputFinalReport, Container } from 'styledComponents';

export const FinalReportScreen = () => {
  const [reportDetails, setReportDetails] = useState({
    murderer: '',
    victim: '',
    relationship: '',
    motive: '',
    inheriter: '',
  });
  const { murderer, victim, relationship, motive, inheriter } = reportDetails;
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  let score = 0;
  const totalScore = 5;
  if (murderer.toLowerCase() === 'robert delaware') score++;
  if (victim.toLowerCase() === 'steven fisher') score++;
  if (relationship.toLowerCase() === 'cleaner') score++;
  if (motive.toLowerCase() === 'obsession') score++;
  if (inheriter.toLowerCase() === 'henry fisher') score++;

  const playerScore = (score / totalScore) * 100;

  const formOnSubmit = event => {
    event.preventDefault();
    setIsSubmitClicked(true);
  };

  return (
    <Container>
      {((isTabletOrMobile && !isSubmitClicked) || !isTabletOrMobile) && (
        <FinalReport>
          <h1>Final Report</h1>
          <Form onSubmit={event => formOnSubmit(event)}>
            <MurdererSection>
              <InputFinalReport
                type="text"
                placeholder="Name"
                onChange={event =>
                  setReportDetails({
                    ...reportDetails,
                    murderer: event.target.value,
                  })
                }
                value={reportDetails.murderer}
                required={true}
                disabled={isSubmitClicked}
              />
              <Span>killed</Span>
              <InputFinalReport
                type="text"
                placeholder="Name"
                onChange={event =>
                  setReportDetails({
                    ...reportDetails,
                    victim: event.target.value,
                  })
                }
                value={reportDetails.victim}
                required={true}
                disabled={isSubmitClicked}
              />
            </MurdererSection>
            <RelationshipSection>
              <Span>The killer was the victims</Span>
              <Select
                defaultValue={reportDetails.relationship}
                required
                onChange={event =>
                  setReportDetails({
                    ...reportDetails,
                    relationship: event.currentTarget.value,
                  })
                }
                disabled={isSubmitClicked}
              >
                <option value="" disabled>
                  Choose option
                </option>
                <option value="son">Son</option>
                <option value="daughter">Daugther</option>
                <option value="neighbour">Neighbour</option>
                <option value="businessPartner">Business partner</option>
                <option value="cleaner">Cleaner</option>
                <option value="friend">Friend</option>
                <option value="wife">Wife</option>
                <option value="gardener">Gardener</option>
                <option value="employee">Other employee</option>
              </Select>
            </RelationshipSection>

            <MotiveSection>
              <Span>The victim got murdered due to</Span>
              <Select
                defaultValue={reportDetails.motive}
                required
                onChange={event =>
                  setReportDetails({
                    ...reportDetails,
                    motive: event.currentTarget.value,
                  })
                }
                disabled={isSubmitClicked}
              >
                <option value="" disabled>
                  Choose option
                </option>
                <option value="colleuge">
                  A conflict with the CTO of BookFace
                </option>
                <option value="inheritageEllen">
                  Fight about inheritage with Ellen Fisher
                </option>
                <option value="inheritageHenry">
                  Fight about inheritage with Henry Fisher
                </option>
                <option value="BookFace heir">
                  Fight about who will take over BookFace
                </option>
                <option value="obsession">
                  Love for and obsession of Ellen Fisher
                </option>
                <option value="affair">
                  him having an affair with another woman
                </option>
                <option value="wifeAffair">
                  him founding out that his wife had an affair
                </option>
              </Select>
            </MotiveSection>
            <FamilyBusinessSection>
              <InputFinalReport
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
                disabled={isSubmitClicked}
              />
              <Span>will take over the family company.</Span>
            </FamilyBusinessSection>
            <Button text="Submit" disabled={isSubmitClicked} />
          </Form>
        </FinalReport>
      )}
      {isSubmitClicked && (
        <Conclusion>
          <h1>Conclusion</h1>
          <Score>{`Score: ${playerScore} %`}</Score>
          <p>
            {murderer.toLowerCase() === 'robert delaware'
              ? 'My gut feeling is that we got it right this time'
              : 'we got it wrong'}
          </p>
          <p>
            {victim.toLowerCase() === 'steven fisher'
              ? 'My gut feeling is that we got it right this time'
              : 'we got it wrong'}
          </p>
          <p>
            {relationship.toLowerCase() === 'cleaner'
              ? 'My gut feeling is that we got it right this time'
              : 'we got it wrong'}
          </p>
          <p>
            {motive.toLowerCase() === 'obsession'
              ? 'My gut feeling is that we got it right this time'
              : 'we got it wrong'}
          </p>
          <p>
            {inheriter.toLowerCase() === 'henry fisher'
              ? 'My gut feeling is that we got it right this time'
              : 'we got it wrong'}
          </p>

          <p>Best Regards</p>
          <span>Owen Matthews</span>
        </Conclusion>
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
  min-width: 500px;
  @media (max-width: 535px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    min-width: 300px;
    padding: 10px 10px 60px 10px;
  }
  @media (min-width: 536px) and (max-width: 1024px) {
    width: 100%;
    margin: 0;
    border-radius: 0;
    min-width: 300px;
    padding: 10px 10px 60px 10px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: auto, auto, auto, 1fr;
`;

const MurdererSection = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  @media (max-width: 535px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
const RelationshipSection = styled(MurdererSection)`
  grid-template-columns: 1fr auto;
`;
const MotiveSection = styled(MurdererSection)`
  grid-template-columns: 1fr auto;
`;
const FamilyBusinessSection = styled(MurdererSection)`
  grid-template-columns: auto 1fr;
`;

const Select = styled.select`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  height: 31px;
  border: none;
  font-size: 16px;
  width: 150px;
  @media (max-width: 535px) {
    width: 100%;
  }
  @media (min-width: 536px) and (max-width: 1024px) {
    width: 200px;
  }
`;

const Conclusion = styled.div`
  margin: 10px;
  padding: 10px;
`;

const Span = styled.span`
  margin: 10px 0px;
  padding: 6px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${white};
  font-size: 16px;
  @media (max-width: 667px) {
    width: 100%;
  }
  @media (min-width: 668px) and (max-width: 1024px) {
    width: 100%;
  }
`;

const Score = styled.p`
  font-weight: 700;
`;

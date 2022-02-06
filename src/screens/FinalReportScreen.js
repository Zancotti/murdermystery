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
  if (relationship.toLowerCase() === 'gardener') score++;
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
                  Choose relation
                </option>
                <option value="son">Son</option>
                <option value="daughter">Daugther</option>
                <option value="neighbour">Neighbour</option>
                <option value="businessPartner">Business partner</option>
                <option value="cleaner">Butler</option>
                <option value="cook">Cook</option>
                <option value="gardener">Gardener</option>
                <option value="friend">Friend</option>
                <option value="wife">Wife</option>
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
                  Choose motive
                </option>
                <option value="colleuge">A conflict within BookFace</option>
                <option value="blackmail">Being blackmailed</option>
                <option value="inheritage">Fight about inheritage</option>
                <option value="bookFaceHeir">
                  Fight about who will take over BookFace
                </option>
                <option value="obsession">Love and obsession</option>
                <option value="affair">Having an affair</option>
                <option value="wifeAffair">
                  finding out that the partner had an affair
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
              ? 'I did not see it coming if I am honest. To think that Robert Delaware is capable of murder. I must say, good work that you found and connected the dots.'
              : 'I do understand why you would feel that that is the murderer but I have a gut feeling we are missing something here. I think we need to investigate this more deeply.'}
          </p>
          <p>
            {victim.toLowerCase() === 'steven fisher'
              ? 'Steven Fisher was indeed the person found dead in the Fisher residence. He will be missed by many, even if he did take part of his share of controversey.'
              : 'We are in awe that you would be able to get the victim wrong, did you even read my introduction email? It is Steven Fisher, the famous tech CEO that has died.'}
          </p>
          <p>
            {relationship.toLowerCase() === 'gardener'
              ? 'It is crazy to think that Delaware had worked for 10 years as a gardener for the Fishers.'
              : 'I dont think we have nailed the relation between the killer and the victim. We need to make sure to pin-point how the murderer knew Steven Fisher.'}
          </p>
          <p>
            {motive.toLowerCase() === 'obsession'
              ? 'The obsession Delaware had for the Fishers daughter is what eventually caused Stevens death. I wonder how Steven found out about it, but what is certain is that the afternoon meeting was Steven confronting Delaware. Whatever was said during this meeting caused Delaware to snap and push Steven down the stairs to his death.'
              : 'It is an interesting theory to why Steven Fisher was murdered, but I am not buying it. The evidence for it is just not there.'}
          </p>
          <p>
            {inheriter.toLowerCase() === 'henry fisher'
              ? 'A lot of people are in despair that Henry Fisher is set to take over the familys companies. His sister, Ellen, just seem like a much better fit with her background, dont you think?'
              : 'From the sources and documentation I have read, that it is not who is set to take over Fishers companies.'}
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
  @media (max-width: 667px) {
    padding: 10px 10px 60px 10px;
  }
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

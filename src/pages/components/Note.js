import React from "react";
import styled from "styled-components";

const BorderContainer = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 16px;

  &:hover {
    box-shadow: 3px 3px 5px 6px #ccc;
  }
`;

const SubtleText = styled.p`
  color: gray;
`;

const NoteHeading = styled.div`
  display: flex;
  justify-content: space-between;

  h2 {
    margin-bottom: 0;
    text-decoration: underline;
  }
`;

export const Note = ({ title, details, dateCreated }) => (
  <BorderContainer>
    <NoteHeading>
      <h2>{title}</h2>
      <SubtleText>{new Date(dateCreated).toDateString()}</SubtleText>
    </NoteHeading>
    <p>{details}</p>
  </BorderContainer>
);

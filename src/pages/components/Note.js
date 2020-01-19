import React from "react";
import styled from "styled-components";

const BorderContainer = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  padding: 16px;
`;

export const Note = ({ title, body, ...rest }) => (
  <BorderContainer {...rest}>
    <h2>{title}</h2>
    <p>{body}</p>
  </BorderContainer>
);

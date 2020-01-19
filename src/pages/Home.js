import React from "react";
import { useHistory } from "react-router-dom";
import { Note } from "./components/Note";
import styled from "styled-components";
import { LoadingIndicator } from "./components/LoadingIndicator";

const NoteList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaddedNote = styled(Note)`
  margin-bottom: 16px;
`;

const StyledButton = styled.button`
  border-radius: 3px;
  font-size: 24px;
  margin: 8px 0;
  padding: 16px 32px;

  background-color: green;
`;

export const Home = ({ isLoading, notes }) => {
  const history = useHistory();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <h2>My Notes:</h2>
      {notes.length >= 1 ? (
        <div>
          <StyledButton onClick={() => history.push("/edit")}>
            Add Note
          </StyledButton>
          <NoteList>
            {notes.map(note => (
              <PaddedNote key={`note-${note.id}`} {...note} />
            ))}
          </NoteList>
        </div>
      ) : (
        <div>
          <p>You've got no notes! :(</p>
          <StyledButton onClick={() => history.push("/edit")}>
            How about adding one now?
          </StyledButton>
        </div>
      )}
    </div>
  );
};

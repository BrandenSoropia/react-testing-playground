import React from "react";
import { useHistory } from "react-router-dom";
import { Note } from "./components/Note";
import styled from "styled-components";

const NoteList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  margin: 8px 0;
`;

export const Home = ({ notes }) => {
  const history = useHistory();

  return (
    <div>
      {notes.length >= 1 ? (
        <div>
          <StyledButton onClick={() => history.push("/edit")}>
            Add Note
          </StyledButton>
          <NoteList>
            {notes.map(note => (
              <Note key={`note-${note.dateCreated}`} {...note} />
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

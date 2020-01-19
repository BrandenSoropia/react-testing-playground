import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { BackButton } from "./components/BackButton";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 16px;
  width: 80%;

  label {
    margin: 8px 0;
    text-align: left;
  }
`;

// Export this so Enzyme can find this component better!
export const StyledButton = styled.button`
  margin-top: 16px;
  background-color: ${({ disabled }) => (disabled ? "grey" : "green")};
  padding: 16px;
  border-radius: 3px;
`;

/**
 * 2 lines of defence for un-filled note:
 * 1) Disable button until both title and details are given
 * 2) Double check that title and details are given on button click. (in case user knows they can delete the "disabled" attribute on button)
 */
export const EditNotes = ({ currentNotes, setNotes }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [showError, setShowError] = useState(false);
  const [areAllRequiredGiven, setAreAllRequiredGiven] = useState(false);
  const history = useHistory();

  // This is not very effecient ^^;
  useEffect(() => {
    if (title && details) {
      setAreAllRequiredGiven(true);
    }
  }, [title, details]);

  return (
    <div>
      <BackButton />
      <StyledForm>
        <label htmlFor="title">Title*</label>
        <input
          data-testid="edit-note-title"
          name="title"
          type="text"
          onChange={e => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label htmlFor="details">Details*</label>
        <input
          data-testid="edit-note-details"
          name="details"
          type="text"
          onChange={e => {
            setDetails(e.target.value);
          }}
          value={details}
        />
        <div>
          {showError && <p>Please make sure we have a title and details!</p>}
          <StyledButton
            disabled={!areAllRequiredGiven}
            data-testid="edit-note-submit"
            onClick={e => {
              e.preventDefault();
              if (!title || !details) {
                setShowError(true);
              } else {
                setNotes([
                  ...currentNotes,
                  { title, details, dateCreated: Date.now() }
                ]);
                history.push("/");
              }
            }}
          >
            Save Note
          </StyledButton>
        </div>
      </StyledForm>
    </div>
  );
};

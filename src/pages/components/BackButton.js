import React from "react";
import { useHistory } from "react-router-dom";

export const BackButton = () => {
  const history = useHistory();

  return (
    <button data-testid="back-button" tabIndex={0} onClick={history.goBack}>
      <span role="img" aria-label="Back Button">
        🔙
      </span>
      Go Back
    </button>
  );
};

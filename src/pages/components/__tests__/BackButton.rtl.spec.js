import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BackButton } from "../BackButton";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

/**
 * Unit test example!
 */
describe("BackButton tests", () => {
  it("should go back to previous route on click", () => {
    // Emulate user starting on home screen, then moving to edit screen
    const history = createMemoryHistory({
      initialEntries: ["/", "/edit"],
      initialIndex: 1
    });

    const { getByTestId } = render(
      <Router history={history}>
        <BackButton />
      </Router>
    );
    expect(history.location.pathname).toBe("/edit");

    fireEvent.click(getByTestId("back-button"));

    expect(history.location.pathname).toBe("/");
  });
});

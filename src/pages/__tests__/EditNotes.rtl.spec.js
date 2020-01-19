import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { EditNotes } from "../EditNotes";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

/**
 * Goal:
 * Make sure the feature works as a user would use it!
 * a.k.a Testing behaviour not implementation!
 *
 * To write this test there were some extra steps taken:
 *
 * 1) Mocking
 * Needed to mock Date since the component internally uses it when creating a new note
 * Also needed to mock functions passed in as props. It's used to track key event of
 * "setting a note". As a bonus, can really dig deep and see that the expected values are passed to it!
 *
 * 2) Component wrapped in provders (in this case React Router)
 * Need to make sure the test can simulate the expected behaviour when using this feature.
 * This allows the test to make sure the user is redirected appropriately.
 *
 * This would extend to Redux, if existing, but we shouldn't check the exact state, but rather
 * the UI rendered because of it!
 */
describe("EditNotes tests", () => {
  let dateNowSpy = null;

  beforeAll(() => {
    // Lock Time
    dateNowSpy = jest
      .spyOn(Date, "now")
      .mockImplementation(() => 1487076708000);
  });
  afterAll(() => {
    // Unlock Time
    dateNowSpy.mockRestore();
  });

  it("should successful save a note when title and details are given", () => {
    const noteDetails = {
      title: "Lunch w/ Jimmy Neutron",
      details: "Meet at McSpanky's",
      dateCreated: 1487076708000
    };
    const mockSetNotes = jest.fn();
    const history = createMemoryHistory();

    const { getByTestId } = render(
      <Router history={history}>
        <EditNotes currentNotes={[]} setNotes={mockSetNotes} />
      </Router>
    );

    fireEvent.change(getByTestId("edit-note-title"), {
      target: { value: noteDetails.title }
    });
    fireEvent.change(getByTestId("edit-note-details"), {
      target: { value: noteDetails.details }
    });

    const submitButton = getByTestId("edit-note-submit");
    expect(submitButton).not.toHaveAttribute("disabled");

    fireEvent.click(submitButton);
    expect(history.location.pathname).toBe("/");
    expect(mockSetNotes).toHaveBeenCalledWith([noteDetails]);
  });
});

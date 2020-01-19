import React from "react";
import { mount } from "enzyme";
import { EditNotes, StyledButton } from "../EditNotes";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

/**
 * Testing with Enzyme!
 * Similar API as react-testing-library, but with a lot of extra functionality.
 *
 * Tiny Caveat:
 * Note Enzyme struggles finding styled components via props, so you have to import the styled component
 * and use it as a selector. Otherwise, Enzyme will find 3 components with the same prop.
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

    const wrapper = mount(
      <Router history={history}>
        <EditNotes currentNotes={[]} setNotes={mockSetNotes} />
      </Router>
    );

    wrapper.find({ "data-testid": "edit-note-title" }).simulate("change", {
      target: { value: noteDetails.title }
    });

    wrapper.find({ "data-testid": "edit-note-details" }).simulate("change", {
      target: { value: noteDetails.details }
    });

    const submitButton = wrapper.find(StyledButton);
    expect(submitButton.prop("disabled")).toBe(false);

    submitButton.simulate("click");
    expect(history.location.pathname).toBe("/");
    expect(mockSetNotes).toHaveBeenCalledWith([noteDetails]);
  });
});

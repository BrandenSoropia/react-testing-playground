import React from "react";
import { mount } from "enzyme";
import { EditNotes, StyledButton } from "../EditNotes";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";

const ghettoWaitForNextTick = () =>
  new Promise(resolve => {
    setTimeout(resolve, 0);
  });

/**
 * Testing with Enzyme!
 * Similar API as react-testing-library, but with a lot of extra functionality.
 *
 * Finding styled-component Caveat:
 * Note Enzyme struggles finding styled components via props, so you have to import the styled component
 * and use it as a selector. Otherwise, Enzyme will find 3 components with the same prop.
 *
 * Async Caveat:
 * No helper to wait for async stuff to resolve. Have to force wait with setTimeout...
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

  it("should successful save a note when title and details are given", async () => {
    const noteDetails = {
      title: "Lunch w/ Jimmy Neutron",
      details: "Meet at McSpanky's",
      dateCreated: 1487076708000
    };
    // mock out window.fetch for the test
    const fetchSpy = jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(noteDetails)
      });
    });
    const mockSetNotes = jest.fn();
    const history = createMemoryHistory({
      initialEntries: ["/", "/edit"],
      initialIndex: 1
    });

    const wrapper = mount(
      <Router history={history}>
        <EditNotes currentNotes={[]} setNotes={mockSetNotes} />
      </Router>
    );
    expect(history.location.pathname).toBe("/edit");

    wrapper.find({ "data-testid": "edit-note-title" }).simulate("change", {
      target: { value: noteDetails.title }
    });

    wrapper.find({ "data-testid": "edit-note-details" }).simulate("change", {
      target: { value: noteDetails.details }
    });

    const submitButton = wrapper.find(StyledButton);
    expect(submitButton.prop("disabled")).toBe(false);

    await submitButton.simulate("click");
    await ghettoWaitForNextTick();

    expect(history.location.pathname).toBe("/");
    expect(mockSetNotes).toHaveBeenCalledWith([noteDetails]);
  });
});

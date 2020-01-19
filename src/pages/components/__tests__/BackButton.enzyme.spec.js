import React from "react";
import { mount } from "enzyme";
import { BackButton } from "../BackButton";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
/**
 * Can't use shallow
 */
describe("BackButton tests", () => {
  it("should go back to previous route on click", () => {
    // Emulate user starting on home screen, then moving to edit screen
    const history = createMemoryHistory({
      initialEntries: ["/", "/edit"],
      initialIndex: 1
    });
    const wrapper = mount(
      <Router history={history}>
        <BackButton />
      </Router>
    );
    expect(history.location.pathname).toBe("/edit");
    wrapper.find("button").simulate("click");
    expect(history.location.pathname).toBe("/");
  });

  // Notice anything different about this unit test?
  it("should have be a11y", () => {
    // Emulate user starting on home screen, then moving to edit screen
    const history = createMemoryHistory({
      initialEntries: ["/", "/edit"],
      initialIndex: 1
    });
    const wrapper = mount(
      <Router history={history}>
        <BackButton />
      </Router>
    );
    const button = wrapper.find("button");

    expect(button.prop("tabIndex")).toBe(0);

    const innerButtonText = button.find("span");
    expect(typeof innerButtonText.prop("aria-label")).toBe("string");
    // Answer: This is checking implementation!
    // If we changed how BackButton was written, this test might just fail, throwing a false negative!
  });

  // Bonus: This test doesn't work because shallow auto-mocks non-basic HTML child elements!
  //   it("should go back to previous route on click", () => {
  //     // Emulate user starting on home screen, then moving to edit screen
  //     const history = createMemoryHistory({
  //       initialEntries: ["/", "/edit"],
  //       initialIndex: 1
  //     });
  //     const wrapper = shallow(
  //       <Router history={history}>
  //         <BackButton />
  //       </Router>
  //     );
  //     expect(history.location.pathname).toBe("/edit");
  //     wrapper.find({ "data-testid": "back-button" }).simulate("click");
  //     expect(history.location.pathname).toBe("/");
  //   });
});

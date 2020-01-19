import React from "react";
import { EditNotes } from "./EditNotes";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "EditNotes",
  decorators: [storyFn => <Router>{storyFn()}</Router>]
};

export const defaultView = () => (
  <EditNotes currentNotes={[]} setNotes={() => {}} />
);

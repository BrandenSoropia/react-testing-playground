import React from "react";
import { EditNotes } from "./EditNotes";

export default { title: "EditNotes" };

export const defaultView = () => (
  <EditNotes currentNotes={[]} setNotes={() => {}} />
);

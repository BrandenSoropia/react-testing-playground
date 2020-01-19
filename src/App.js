import React, { useState } from "react";
import "./styles.css";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { EditNotes } from "./pages/EditNotes";
import { Home } from "./pages/Home";
import styled from "styled-components";

const Navigation = styled.div`
  display: flex;
`;

export const App = () => {
  const [notes, setNotes] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navigation>
          <Link to="/">Home</Link>
          <Link to="/edit">Add</Link>
        </Navigation>

        <Switch>
          <Route path="/edit/:noteId?">
            <EditNotes currentNotes={notes} setNotes={setNotes} />
          </Route>
          <Route path="/">
            <Home notes={notes} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

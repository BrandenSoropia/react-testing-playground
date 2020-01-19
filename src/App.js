import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { EditNotes } from "./pages/EditNotes";
import { Home } from "./pages/Home";
import styled from "styled-components";

const Navigation = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const PaddedLinks = styled(Link)`
  margin-right: 16px;
  font-size: 32px;
`;

export const App = () => {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
      .then(response => response.json())
      .then(json => {
        setNotes(json);
      })
      .catch(error => {
        alert("Sorry, something went wrong getting posts!");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navigation>
          <PaddedLinks to="/">Home</PaddedLinks>
          <PaddedLinks to="/edit">Add</PaddedLinks>
        </Navigation>
        <Switch>
          <Route path="/edit/:noteId?">
            <EditNotes
              currentNotes={notes}
              setNotes={setNotes}
              isLoading={isLoading}
            />
          </Route>
          <Route path="/">
            <Home notes={notes} isLoading={isLoading} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

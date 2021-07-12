
import './App.css';
import React from "react";
import Header from './Header';
import Content from './Content';
import HeaderActions from './HeaderActions';

import { useDataLayerContextValue } from "./DataLayer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [{ featuredPlaylist }, dispatch] = useDataLayerContextValue();
  return (

    <div className="app">
      <Header />
      {featuredPlaylist.length > 0 &&
        <HeaderActions />
      }
      <div className="app_body">
        <Router>
          <Switch>
            <Route path='/songs/:songid'> <Content /></Route>
            <Route path='/'><Content /></Route>
          </Switch>
        </Router>

      </div>


    </div>
  );
}

export default App;

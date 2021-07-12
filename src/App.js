
import './App.css';
import React from "react";
import Header from './Header';
import Content from './Content';

import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import AddIcon from '@material-ui/icons/Add';
import HeaderOption from "./HeaderOption";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDataLayerContextValue } from "./DataLayer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [{ featuredPlaylist }, dispatch] = useDataLayerContextValue();
  return (

    <div className="app">
      <Header />
      {featuredPlaylist.length > 0 &&

        <div className="header__actions">
          <HeaderOption title="Your Library" Icon={LibraryMusicIcon} />
          <HeaderOption title="Create Playlist" Icon={AddIcon} />
          <HeaderOption title="Liked Songs" Icon={FavoriteIcon} />
        </div>
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

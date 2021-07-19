import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import HeaderActions from "./HeaderActions";
import Search from "./Search";
import { actionTypes } from "./reducer";
import { useDataLayerContextValue } from "./DataLayer";
import { auth } from "./firebase";
import Login from "./Login";
import Landing from "./Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PlaylistContent from "./PlaylistContent";
import RegionalContent from "./RegionalContent";
import ArtistContent from "./ArtistContent";
import BandContent from "./BandContent";
import PlayerLite from "./PlayerLite";
function App() {
  const [searchSuggestionWindowOpened, setSearchSuggestionWindowOpened] =
    useState(false);

  const [user, dispatch] = useDataLayerContextValue();
  const [mediaObject, setMediaObject] = useState(null);
  const [mediaPaused, setMediaPaused] = useState(false);
  const [_user, setUser] = useState(null);
  const initiateMediaObject = (_mediaObject) => {
    setMediaObject(_mediaObject);
  }

  useEffect(() => {
    //backend listener
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        setUser(authUser);
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        //user logged out
        dispatch({
          type: "LOG_OUT",
          user: null,
        });
        setUser(null);
      }
    });
  }, [_user]);
  const toggleSearchSuggestionWindow = (bool) => {
    setSearchSuggestionWindowOpened(bool);
  };
  return (
    <div>
      {!_user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <Search
            isSuggestionOpened={searchSuggestionWindowOpened}
            toggleSearchSuggestionWindow={toggleSearchSuggestionWindow}
          />
          <HeaderActions />

          <Router>
            <Switch>
              <Route path="/playlist/:playlistid">
                <PlaylistContent media={initiateMediaObject} pauseRequested={setMediaPaused}
                  fetchUrl={"playlist?pid="}
                  isIndian
                  setSearchSuggestionWindowOpened={
                    setSearchSuggestionWindowOpened
                  }
                />
              </Route>
              <Route path="/artist/:artistid">
                <ArtistContent
                  isIndian
                  setSearchSuggestionWindowOpened={
                    setSearchSuggestionWindowOpened
                  }
                />
              </Route>
              <Route path="/regional/:regionid">
                <RegionalContent
                  setSearchSuggestionWindowOpened={
                    setSearchSuggestionWindowOpened
                  }
                />
              </Route>
              <Route path="/band/:bandid">
                <BandContent
                  isIndian
                  setSearchSuggestionWindowOpened={
                    setSearchSuggestionWindowOpened
                  }
                />
              </Route>
              <Route path="/">
                {" "}
                <Landing
                  setSearchSuggestionWindowOpened={
                    setSearchSuggestionWindowOpened
                  }
                />
              </Route>
            </Switch>
          </Router>
          <PlayerLite setSearchSuggestionWindowOpened={
            setSearchSuggestionWindowOpened
          } media={mediaObject} isMediaPaused={mediaPaused} />

        </div>
      )}
    </div>
  );
}

export default App;

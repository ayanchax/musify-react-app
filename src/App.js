import "./App.css";
import React, { useState } from "react";
import Header from "./Header";
import HeaderActions from "./HeaderActions";
import Search from "./Search";
import { categories, artists, bands } from './requests'
import Artists from "./Artists";
import "./Player.css";
import IndianRegional from "./IndianRegional";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import PlaylistCategories from "./PlaylistCategories";
import Bands from "./Bands";
function App() {
  const [searchSuggestionWindowOpened, setSearchSuggestionWindowOpened] = useState(false)
  const toggleSearchSuggestionWindow = (bool) => {
    setSearchSuggestionWindowOpened(bool)
  }
  return (
    <div className="app">
      <Header />
      <Search isSuggestionOpened={searchSuggestionWindowOpened} toggleSearchWindow={toggleSearchSuggestionWindow} />
      <HeaderActions />

      <div onClick={(e) => setSearchSuggestionWindowOpened(false)} className="app__body">
        <PlaylistCategories isIndian categoryMap={categories} />
        {/* artists */}
        <Artists genre="Indian" isIndian data={artists[0].INDIAN} seeMoreIconText />
        {/* regional section */}
        <IndianRegional />
        {/* Bands */}
        <Bands genre="বাংলা" isIndian data={bands[0].BANGLA} seeMoreIconText />
      </div>

      <footer className="player">
        <AudioPlayer
          hasDefaultKeyBindings={true}
          autoPlayAfterSrcChange={true}
          autoPlay={false}
          src="https://aac.saavncdn.com/333/9c29212ca701cbbbe2554ec58fe63ce2_320.mp4"
          volume={0.5}
          className=""
          showSkipControls={true}
          onClickPrevious={(e) => console.log()}
          onClickNext={(e) => console.log()}
          onEnded={(e) => console.log()}
          onPlay={(e) => console.log("Play initiated")}
          onPlayError={(e) => console.log()}
          onError={(e) => console.log()}
          onPause={(e) => console.log()}
          onEmptied={(e) => console.log("Emptied")}
          onCanPlay={(e) => console.log("Can Play")}
          onPlaying={(e) => console.log()}
          onLoadStart={(e) => console.log("Load Start")}
          onLoadedMetaData={(e) => console.log("Loaded Metadata")}
          onLoadedData={(e) => console.log("Loaded Data")}
          onSuspend={(e) => console.log("Suspended")}
          onWaiting={(e) => console.log("Waiting")}
          onVolumeChange={(e) => console.log("Volume Changed")}
          customAdditionalControls={[
            RHAP_UI.LOOP,
            <FavoriteBorderIcon
              className="favorite-icon off"
            />
            ,
          ]}
        />
      </footer>
    </div >

  );
}

export default App;

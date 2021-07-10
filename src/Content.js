import React, { useState, useEffect, useRef } from "react";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import axios from "./axios";
import requests from "./requests";
import "./Content.css";
import "./Player.css";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Search from './Search';
function Content() {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const playerObject = useRef(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchSongs)
            setSongs(request.data);
            setCurrentSong(songs[0]);
            return request;
        }
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    function play(_song) {
        setCurrentSong(_song);
        if (_song._id === currentSong?._id && paused) {
            playerObject.current.audio.current.play();
            setCurrentSong(_song);
        }
    }
    function onPlayerPaused() {
        setPlaying(false);
        setPaused(true)
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function pause() {
        setPlaying(false);
        setPaused(true)
        playerObject.current.audio.current.pause();
        document.title = "Musify";
    }
    function onPlayed() {
        setPlaying(true); setPaused(false)
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function onPlayedError() {
        setPlaying(false); setPaused(false)
        document.title = "Musify";
    }
    function onPlayedPrev() {
        setIndex(index - 1)
        if (index < 0) {
            // if index is smaller than zero, then set index to last
            setIndex(songs.length - 1);
        }
        setPlaying(true)
        setCurrentSong(songs[index])
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function onPlayedNext() {
        setIndex(index + 1)
        if (index < 0) {
            // if index is smaller than zero, then set index to last
            setIndex(0);
        }
        setPlaying(true)
        setCurrentSong(songs[index])
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title

    }
    function onEnded() {
        document.title = "Musify";
        setPlaying(false)
        setPaused(false)
        onPlayedNext();
    }
    if (songs.length > 0) {
        return (
            <div className="content">
                <Search />
                <div className="content__header">
                    <MusicNoteIcon className="content__headerIcon" />
                    <h2>Featured Playlist</h2>
                </div>

                <div className="content__playlist center">
                    {songs.map((song) => (
                        <div
                            key={song?._id}
                            onClick={() =>
                                song?._id === currentSong?._id && playing ? pause() : play(song)
                            }
                            className={`content__playlist__song ${song._id === currentSong?._id && playing ? `active` : ``
                                }`}
                        >
                            <p>

                                {song._id === currentSong?._id && (playing) ? (<Loader className="content__playlist__audioLoader"
                                    type="Audio"
                                    color="#ffff"
                                    height={20}
                                    width={20}

                                />) : (<MusicNoteIcon className="content__icon" />)} {" "}
                                {truncate(song.metadata.format.tags.title, 200)}
                            </p>
                            <span className="song__artist">
                                {truncate(song.metadata.format.tags.artist, 150)}
                            </span>{" "}
                            <span className="song__delimiter">-</span>{" "}
                            <span className="song__album">
                                {truncate(song.metadata.format.tags.album, 30)}
                            </span>
                        </div>
                    ))}
                </div>


                <div className="player">

                    <AudioPlayer
                        ref={playerObject}
                        hasDefaultKeyBindings={true}
                        autoPlayAfterSrcChange={true}
                        autoPlay={false}
                        src={currentSong?.s3Path}
                        volume={0.5}
                        showSkipControls={true}
                        onClickPrevious={(e) => onPlayedPrev()}
                        onClickNext={(e) => onPlayedNext()}
                        onEnded={(e) => onEnded()}
                        onPlay={(e) => console.log("Play initiated")}
                        onPlayError={(e) => onPlayedError()}
                        onError={(e) => onPlayedError()}
                        onPause={(e) => onPlayerPaused()}
                        onEmptied={(e) => console.log("Emptied")}
                        onCanPlay={(e) => console.log("Can Play")}
                        onPlaying={(e) => onPlayed()}
                        onLoadStart={(e) => console.log("Load Start")}
                        onLoadedMetaData={(e) => console.log("Loaded Metadata")}
                        onLoadedData={(e) => console.log("Loaded Data")}
                        onSuspend={(e) => console.log("Suspended")}
                        onWaiting={(e) => console.log("Waiting")}
                        onVolumeChange={(e) => console.log("Volume Changed")}
                        customAdditionalControls={[
                            RHAP_UI.LOOP,


                        ]}
                        header={<div className="content__currentSongInfo">
                            <div className="content__currentSongTitle">{(playing) && (currentSong !== undefined || currentSong !== "undefined") ? (
                                <div className="content__currentSongTitleElements">
                                    <img className="content__song__thumbnail" src="https://i1.sndcdn.com/avatars-pXAmgKVNbQvrXCST-MAaq0g-t200x200.jpg"
                                        alt="SongContentImage" />&nbsp;&nbsp;
                                    <Loader className="content__currentSongTitle__audioLoader"
                                        type="Audio"
                                        color="#00BFFF"
                                        height={20}
                                        width={20}

                                    /></div>) : ("")} &nbsp;&nbsp;

                                {truncate(currentSong?.metadata?.format?.tags.title, 100)}
                            </div>

                            <div>
                                {(playing) && (currentSong !== undefined || currentSong !== "undefined") ? (
                                    <span title={currentSong?.metadata?.format?.tags.artist + '-' + currentSong?.metadata?.format?.tags.album} className="song__artist dim-white">
                                        {truncate(currentSong?.metadata?.format?.tags.artist, 70)}
                                        {" "}<span className="song__delimiter">-</span>{" "}
                                        {truncate(currentSong?.metadata?.format?.tags.album, 15)}
                                    </span>) : ("")}
                            </div>
                        </div>
                        }

                    />
                </div>



            </div>
        );
    }
    else {
        return (<div className="content">
            <div className="content__header">
                <Loader className="content__audio_loader"
                    type="Audio"
                    color="#00BFFF"
                    height={20}
                    width={20}

                /> <p className="content__message">Connecting to media streaming service...please wait</p>
                <br />

            </div>
            <p className="content__message__small">Please check your internet service if you are not connected yet.</p>
        </div>)
    }
}

export default Content;

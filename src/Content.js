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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NativeSelect from '@material-ui/core/NativeSelect';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import ShareIcon from '@material-ui/icons/Share';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ShareDialog from "./ShareDialog";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useDataLayerContextValue } from "./DataLayer";
import { actionTypes } from "./reducer";
import Popover from '@material-ui/core/Popover';
import PlayerMoreOptions from "./PlayerMoreOptions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

toast.configure()


function Content() {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [quality, setAudioQuality] = useState(0);
    const playerObject = useRef(null);
    const [showModal, updateShowModal] = useState(false);
    const [currentSongURI, setCurrentSongURI] = useState("");
    const [index, setIndex] = useState(0);
    const [{ featuredPlaylist }, dispatch] = useDataLayerContextValue();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const linkObject = React.createRef();
    const id = open ? 'simple-popover' : undefined;
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchSongs)
            setSongs(request.data);
            setCurrentSong(request.data[0]);
            setCurrentSongURI(window.location.href)
            request.data.forEach((__song) => {
                if (window.location.href.substring(window.location.href.lastIndexOf("/") + 1) === __song?._id) {
                    play(__song)
                    return;
                }

            });
            dispatch({
                type: actionTypes.SET_FEATURED_PLAYLISTS,
                featuredPlaylist: request.data
            })

            dispatch({
                type: actionTypes.SET_CURRENT_SONG,
                currentSongPlaying: request.data[0]
            })


            return request;
        }
        fetchData();
    }, []);



    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    function play(_song) {
        setCurrentSong(_song);
        setCurrentSongURI(window.location.href)
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: currentSong
        })
        if (_song._id === currentSong?._id && paused) {
            playerObject.current.audio.current.play();
            setCurrentSong(_song);
        }
    }
    function onPlayerPaused() {
        setPlaying(false);
        setPaused(true)
        setCurrentSongURI(window.location.href)
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: currentSong
        })
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function pause() {
        setPlaying(false);
        setPaused(true)
        setCurrentSongURI(window.location.href)
        playerObject.current.audio.current.pause();
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: currentSong
        })
        document.title = "Musify";
    }
    function onPlayed() {
        setPlaying(true); setPaused(false)
        setCurrentSongURI(window.location.href)
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: currentSong
        })
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function onPlayedError() {
        setPlaying(false); setPaused(false)
        setCurrentSongURI(null)
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: null
        })
        document.title = "Musify";
    }
    function onPlayedPrev() {
        setIndex(index - 1)
        if (index < 0) {
            // if index is smaller than zero, then set index to last
            setIndex(songs.length - 1);
        }
        setPlaying(true)
        setCurrentSongURI(window.location.href)
        setCurrentSong(songs[index])
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: songs[index]
        })
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title
    }
    function onPlayedNext() {
        setIndex(index + 1)
        if (index < 0) {
            // if index is smaller than zero, then set index to last
            setIndex(0);
        }
        setPlaying(true)
        setCurrentSongURI(window.location.href)
        setCurrentSong(songs[index])
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: songs[index]
        })
        document.title = "Musify | " + currentSong?.metadata?.format?.tags.title

    }
    function onEnded() {
        document.title = "Musify";
        setPlaying(false)
        setCurrentSongURI(null);
        setPaused(false)
        onPlayedNext();
    }

    function getBlob(currentSong) {
        return currentSong?.blob?.replace("blob:", "");
    }

    function toggleFavorites(e) {
        if (!favorite) {
            setFavorite(true)
            toast.success('Song has been added to your likes', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 3000 })
        }

        else {
            setFavorite(false)
            toast.error('Song has been removed from your likes', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 3000 })
        }
    }
    function getDuration(value) {
        const sec = parseInt(value, 10); // convert value to number if it's string
        let hours = Math.floor(sec / 3600); // get hours
        let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
        // add 0 if value < 10; Example: 2 => 02
        if (hours < 10) { hours = "0" + hours; }
        // if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return minutes + ':' + seconds; // Return is  MM : SS
    }
    const toggleModal = () => updateShowModal(state => !state);

    const openMoreOptionsPopOver = (event,) => {
        setAnchorEl(event.currentTarget);
    }

    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);

    };
    if (songs.length > 0) {
        return (
            <div className="content">

                <ShareDialog url={currentSongURI} networks={['facebook', 'messenger', 'whatsapp', 'linkedin', 'twitter']}
                    title="Share Musify!!" contentTitle={truncate(currentSong?.metadata?.format?.tags.title, 100)} isOpen={showModal} updateModalState={toggleModal} />
                <Search />


                <div className="content__header">
                    <MusicNoteIcon className="content__headerIcon" />
                    <h2>Featured Playlist</h2>
                </div>

                <div className="content__playlist center">
                    {songs.map((song) => (
                        <Link ref={linkObject} to={`/songs/${song?._id}`}
                            key={song?._id} id={song?._id}
                            onClick={() =>
                                song?._id === currentSong?._id && window.location.href === currentSongURI && playing ? pause() : play(song)
                            }
                            className={`content__playlist__song ${song._id === currentSong?._id && window.location.href === currentSongURI && playing ? `active` : ``
                                }`}
                        >

                            <p>

                                {song._id === currentSong?._id && window.location.href === currentSongURI && (playing) ? (<Loader className="content__playlist__audioLoader"
                                    type="Audio"
                                    color="#ffff"
                                    height={20}
                                    width={20}

                                />) : (<MusicNoteIcon className="content__icon" />)} {" "}
                                {truncate(song.metadata.format.tags.title, 200)}
                                <span className="content__duration"><AccessTimeIcon className="content__duration__icon" />{getDuration(song.metadata.format.duration)}</span>
                            </p>
                            <span className="song__artist">
                                {truncate(song.metadata.format.tags.artist, 150)}
                            </span>{" "}
                            <span className="song__delimiter">-</span>{" "}
                            <span className="song__album">
                                {truncate(song.metadata.format.tags.album, 30)}
                            </span>
                        </Link>

                    ))}
                </div>


                <div className={`player ${!playing && !paused ? `translucent` : ``
                    }`}>

                    <AudioPlayer
                        ref={playerObject}
                        hasDefaultKeyBindings={true}
                        autoPlayAfterSrcChange={true}
                        autoPlay={false}
                        src={getBlob(currentSong)}
                        volume={0.5}
                        className={`${!playing && !paused ? `translucent` : ``}`}
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

                            !favorite &&
                            <FavoriteBorderIcon onClick={(e) => toggleFavorites(e)} className="favorite-icon off" />,
                            favorite &&
                            <FavoriteIcon onClick={(e) => toggleFavorites(e)} className="favorite-icon off" />,



                        ]}
                        header={<div className="content__currentSongInfo">
                            <div className="content__currentSongTitle">{(playing || paused) && (currentSong !== undefined || currentSong !== "undefined") ? (
                                <div className="content__currentSongTitleElements">
                                    <img className="content__song__thumbnail" src="https://i1.sndcdn.com/avatars-pXAmgKVNbQvrXCST-MAaq0g-t200x200.jpg"
                                        alt="SongContentImage" />&nbsp;&nbsp;
                                    <Loader className=
                                        {`content__currentSongTitle__audioLoader ${!playing && paused ? `hide` : ``
                                            }`}
                                        type="Audio"
                                        color="#ff5858"
                                        height={20}
                                        width={20}

                                    /></div>) : ("")}
                                {!playing && paused ? "" : "  "}

                                {truncate(currentSong?.metadata?.format?.tags.title, 100)}
                                &nbsp;&nbsp;&nbsp;
                                <GraphicEqIcon className="content__audio__quality__icon" />
                                <div className="content__audio__quality">
                                    <NativeSelect
                                        value={quality}
                                        onChange={(e) => setAudioQuality(e.target.value)}
                                        inputProps={{
                                            name: 'quality',
                                            id: 'audio-quality-helper',
                                        }}
                                    >
                                        <option selected value={0}>Auto</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </NativeSelect>
                                </div>
                                <ShareIcon onClick={toggleModal} className="share-icon off" />
                                <MoreHorizIcon onClick={openMoreOptionsPopOver} className="share-icon off" />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={closeMoreOptionsPopOver}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >

                                    <PlayerMoreOptions onClosed={closeMoreOptionsPopOver} />


                                </Popover>
                            </div>

                            <div>
                                {(playing || paused) && (currentSong !== undefined || currentSong !== "undefined") ? (
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

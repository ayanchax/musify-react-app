import React, { useState, useRef, useEffect } from 'react'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Player.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useDataLayerContextValue } from "./DataLayer";
import { actionTypes } from "./reducer";
import { truncate } from "./utility"
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NativeSelect from "@material-ui/core/NativeSelect";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PlayerMoreOptions from './PlayerMoreOptions';
import Popover from "@material-ui/core/Popover";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShareDialog from './ShareDialog';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
toast.configure();
function PlayerLite({ setSearchSuggestionWindowOpened, media, isMediaPaused }) {
    const playerObject = useRef(null);
    const [{ }, dispatch] = useDataLayerContextValue();
    const [{ currentSongPlaying }, currentSongDispatcher] = useDataLayerContextValue();
    const [{ pause, play }, opDispatcher] = useDataLayerContextValue();
    const [favorite, setFavorite] = useState(false);
    const [quality, setAudioQuality] = useState(0);
    const [showModal, updateShowModal] = useState(false);
    const [autoPlayAfterSrcChange, setAutoPlayAfterSrcChange] = useState(true);
    const [index, setIndex] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    useEffect(() => {
        if (isMediaPaused) { //pause requested
            playerObject.current.audio.current.pause();
            opDispatcher({
                type: actionTypes.SET_PLAYING,
                play: false,
            });
            opDispatcher({
                type: actionTypes.SET_PAUSED,
                pause: true,
            });
        }
        else if (media?.id === currentSongPlaying?.id) {
            playerObject.current.audio.current.play();
            opDispatcher({
                type: actionTypes.SET_PLAYING,
                play: true,
            });
            opDispatcher({
                type: actionTypes.SET_PAUSED,
                pause: false,
            });
        }
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });

    }, [isMediaPaused]);

    useEffect(() => {
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: false,
        });
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: null,
        });
    }, []);

    const onPlay = (e) => {
        console.log("Playing")
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: true,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: false,
        });
        document.title = "Musify | " + media?.song;
    }
    const pauseMedia = (e) => {
        console.log("Paused")
        dispatch({
            type: actionTypes.SET_CURRENT_SONG,
            currentSongPlaying: media,
        });
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: true,
        });
        document.title = "Musify | " + media?.song;
    }
    const onPlayError = (e) => {
        console.log("Play error")
        document.title = "Musify";
        opDispatcher({
            type: actionTypes.SET_PLAYING,
            play: false,
        });
        opDispatcher({
            type: actionTypes.SET_PAUSED,
            pause: true,
        });
    }
    const toggleModal = (event) => {
        updateShowModal((state) => !state);
    }
    const openMoreOptionsPopOver = (event) => {

        setAnchorEl(event.currentTarget);
    };
    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);
    };
    function toggleFavorites(e) {
        if (!favorite) {
            setFavorite(true);
            toast.success("Song has been added to your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        } else {
            setFavorite(false);
            toast.error("Song has been removed from your likes", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        }
    }

    const toggleAutoPlay = (e) => {
        setAutoPlayAfterSrcChange((state) => !state);
    }

    return (
        <div className="player__lite">
            <ShareDialog
                url={window.location.href + "/songs/" + currentSongPlaying?.id + "/" + currentSongPlaying?.song}
                networks={[
                    "facebook",
                    "messenger",
                    "whatsapp",
                    "linkedin",
                    "twitter",
                ]}
                title="Share Musify!!"
                songThumbnail={currentSongPlaying?.image}
                contentTitle={truncate(
                    currentSongPlaying?.song,
                    100
                )}
                content={currentSongPlaying}
                isOpen={showModal}
                updateModalState={toggleModal}
            />
            <footer
                onClick={(e) => setSearchSuggestionWindowOpened(false)}
                className={`player ${!play && !pause ? `translucent` : ``}`}
            >
                <AudioPlayer
                    ref={playerObject}
                    hasDefaultKeyBindings={true}
                    autoPlayAfterSrcChange={autoPlayAfterSrcChange}
                    autoPlay={false}
                    src={media?.media_url}
                    volume={0.5}
                    className=""
                    showSkipControls={true}
                    onClickPrevious={(e) => console.log()}
                    onClickNext={(e) => console.log()}
                    onEnded={(e) => console.log()}
                    onPlay={(e) => console.log("Play initiated")}
                    onPlayError={(e) => onPlayError(e)}
                    onError={(e) => console.log()}
                    onPause={(e) => pauseMedia(e)}
                    onEmptied={(e) => console.log("Emptied")}
                    onCanPlay={(e) => console.log("Can Play")}
                    onPlaying={(e) => onPlay(e, media)}
                    onLoadStart={(e) => console.log("Load Start")}
                    onLoadedMetaData={(e) => console.log("Loaded Metadata")}
                    onLoadedData={(e) => console.log("Loaded Data")}
                    onSuspend={(e) => console.log("Suspended")}
                    onWaiting={(e) => console.log("Waiting")}
                    onVolumeChange={(e) => console.log("Volume Changed")}
                    customAdditionalControls={[
                        RHAP_UI.LOOP,
                        !favorite && (
                            <FavoriteBorderIcon
                                onClick={(e) => toggleFavorites(e)}
                                className="favorite-icon off"
                            />
                        ),
                        favorite && (
                            <FavoriteIcon
                                onClick={(e) => toggleFavorites(e)}
                                className="favorite-icon off"
                            />
                        ),

                    ]}
                    header={
                        <div className="content__currentSongInfo">
                            <div className="content__currentSongTitle">
                                {(play || pause) &&
                                    (currentSongPlaying !== undefined || currentSongPlaying !== "undefined") ? (
                                    <div className="content__currentSongTitleElements">
                                        <img
                                            className="content__song__thumbnail"
                                            src={currentSongPlaying?.image}
                                            alt={currentSongPlaying?.song}
                                        />
                                        &nbsp;&nbsp;
                                        <Loader
                                            className={`content__currentSongTitle__audioLoader ${!play && pause ? `hide` : ``
                                                }`}
                                            type="Audio"
                                            color="#ff5858"
                                            height={20}
                                            width={20}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                                {!play && pause ? "" : "  "}
                                <div className="flex-column text-justify">
                                    <div title={currentSongPlaying?.song} className="text-sm flex-start">{truncate(currentSongPlaying?.song?.trim(), 80)}</div>
                                    {(play || pause) &&
                                        (currentSongPlaying !== undefined || currentSongPlaying !== "undefined") ? (
                                        <div
                                            title={
                                                currentSongPlaying?.primary_artists +
                                                "-" +
                                                currentSongPlaying?.album
                                            }
                                            className="song__artist dim-white player__flex "
                                        >
                                            <div className="player__current__song__metadata text-gray-400">
                                                {truncate(currentSongPlaying?.album, 40)}
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div>&nbsp;&nbsp;</div>
                                <GraphicEqIcon className="content__audio__quality__icon" />

                                <div className="content__audio__quality">
                                    <NativeSelect
                                        value={quality}
                                        onChange={(e) => setAudioQuality(e.target.value)}
                                        inputProps={{
                                            name: "quality",
                                            id: "audio-quality-helper",
                                        }}
                                    >
                                        <option defaultValue value={0}>
                                            Auto
                                        </option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </NativeSelect>
                                </div>
                                <ShareIcon onClick={(e) => toggleModal(e)} className="share-icon off" />
                                <div className="">

                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={autoPlayAfterSrcChange}
                                                onChange={(e) => toggleAutoPlay(e)}
                                                name="checkedB"
                                                color="primary"
                                                size="small"
                                            />
                                        }
                                        label="A"
                                        className="text-xs"
                                        title="Toggle autoplay"
                                    />
                                </div>
                                <MoreHorizIcon
                                    onClick={(e) => openMoreOptionsPopOver(e)}
                                    className="share-icon off"
                                />
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={closeMoreOptionsPopOver}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <PlayerMoreOptions openedFromPlaylist={false} onClosed={closeMoreOptionsPopOver} />
                                </Popover>
                            </div>


                        </div>
                    }
                />
            </footer>
        </div>
    )
}

export default PlayerLite

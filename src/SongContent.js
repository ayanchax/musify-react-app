import React, { useEffect, useState, useRef } from "react";
import axios from "./axios";
import { useParams } from "react-router-dom";
import { truncate, duration } from "./utility"
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import { useDataLayerContextValue } from "./DataLayer";
import { actionTypes } from "./reducer";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./PlaylistContent.css"
import Popover from "@material-ui/core/Popover";
import { Link } from "react-router-dom";
import parse from "html-react-parser"

import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import PlayerMoreOptions from "./PlayerMoreOptions";
import ShareDialog from "./ShareDialog";
function SongContent({ setSearchSuggestionWindowOpened, isIndian, fetchUrl, media, pauseRequested }) {
    const [playlistSongs, setPlaylistSongs] = useState([]);

    const songid = useParams()?.songid;
    const songTitle = useParams()?.songtitle;
    const [{ featuredPlaylist }, dispatch] = useDataLayerContextValue()
    const [{ selectedSongNeedle, pause, play }, dispatch_v2] = useDataLayerContextValue();

    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [currentSong, setCurrentSong] = useState({});
    const [needleSelected, setNeedleSelected] = useState(false);
    const songObject = useRef(null);
    const [showModal, updateShowModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const playMedia = (song) => {
        setCurrentSong(song)
        setPlaying(true);
        setPaused(false);
        pauseRequested(false)
        media(song)
    }
    const pauseMedia = (e) => {
        setPlaying(false);
        setPaused(true);
        pauseRequested(true)
    }
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(fetchUrl + songid).then((response) => {
                setPlaylistSongs(response.data)
                dispatch({
                    type: actionTypes.SET_CURRENT_SONG,
                    featuredPlaylist: response.data,
                })
                playMedia(response.data)
                setSearchSuggestionWindowOpened(false)
            })
        }
        fetchData();

    }, [fetchUrl, songid]);



    useEffect(() => {
        if (pause) {
            setPlaying(false);
            setPaused(true);
        }
        if (play) {
            setPlaying(true);
            setPaused(false);
        }
    }, [pause, play]);

    const OnSongNeedleSelected = (event, playListSong) => {
        if (playListSong != null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });
            setNeedleSelected(true);
        }

    }
    const openMoreOptionsPopOver = (event, isOpenedFromPlaylist, playListSong) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        }
        else {
            setNeedleSelected(false);
        }
        setAnchorEl(event.currentTarget);
    };
    const closeMoreOptionsPopOver = () => {
        setAnchorEl(null);
    };
    const toggleModal = (event, isOpenedFromPlaylist, playListSong) => {
        if (isOpenedFromPlaylist && playListSong !== null) {
            dispatch_v2({
                type: actionTypes.SET_SELECTED_SONG_NEEDLE,
                selectedSongNeedle: playListSong,
            });

            setNeedleSelected(true);
        }
        else {

            setNeedleSelected(false);
        }
        updateShowModal((state) => !state);
    }
    return playlistSongs && (<div className="content" onClick={(e) => setSearchSuggestionWindowOpened(false)}>
        <ShareDialog
            url={"https://musify-7ba7c.web.app/song/" + selectedSongNeedle?.id + "/" + selectedSongNeedle?.title}
            networks={[
                "facebook",
                "messenger",
                "whatsapp",
                "linkedin",
                "twitter",
            ]}
            content={selectedSongNeedle}
            title="Share Musify!!"
            contentTitle={truncate(
                selectedSongNeedle?.title,
                100
            )}
            isOpen={showModal}

            updateModalState={toggleModal}
        />
        <div className="flex  justify-center text-center ">
            <div className="flex-column">
                {playlistSongs?.title && (<Link to="/" className="flex-start cursor-pointer"><KeyboardBackspaceIcon /></Link>)}
                <div title={playlistSongs?.title} className="lg:text-3xl text-xl md:text-2xl font-semibold font-serif
                 text-gray-200 px-2 py-2 antialiased sm:subpixel-antialiased md:antialiased flex  ">

                    {playlistSongs?.title && (<MusicNoteIcon className="content__headerIcon" />)}
                    <h1 title={playlistSongs?.title} >{truncate(playlistSongs?.title, 17)}</h1>
                </div>

                <div title={playlistSongs?.title} className="lg:text-3xl justify-center text-xl md:text-2xl font-semibold font-serif text-gray-200 px-1 py-1">
                    <img className=" object-contain lg:w-64 w-52 justify-center text-center" src={playlistSongs?.image} alt={playlistSongs?.title} />
                </div>
                {playlistSongs?.title && (
                    <div className="flex flex-grow space-x-2 antialiased sm:subpixel-antialiased md:antialiased ">
                        <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-xs lg:text-md md:text-md">
                            Song

                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className="flex justify center">
            <div className="content__playlist center">

                <div title={playlistSongs?.title ? parse(playlistSongs?.title) : ""} key={playlistSongs?.id} className="justify-center">

                    <div onClick={(e) => OnSongNeedleSelected(e, playlistSongs)}
                        className={` flex flex-row px-2 py-1  content__playlist__song ${playlistSongs.id === currentSong?.id &&
                            playing
                            ? `active`
                            : playlistSongs.id === selectedSongNeedle?.id && needleSelected ? `selected` : ``
                            }`}
                    >
                        <div ref={songObject} className="flex flex-grow space-x-1 align-middle">
                            {playlistSongs?.id === currentSong?.id &&

                                playing ? (
                                <div className="flex space-x-1">
                                    <Loader
                                        className="content__playlist__audioLoader"
                                        type="Audio"
                                        color="#ffff"
                                        height={20}
                                        width={20}
                                    />
                                    <PauseCircleFilledRoundedIcon onClick={(e) => pauseMedia(e)} className="content__playlist__audioLoader" />
                                </div>
                            ) : (
                                <PlayCircleFilledRoundedIcon onClick={(e) =>
                                    playlistSongs?.id === currentSong?.id &&
                                        playing
                                        ? pauseMedia(e)
                                        : playMedia(playlistSongs)
                                } className="content__icon" />

                            )}

                            <div className="mt-1">{truncate(playlistSongs?.title ? parse(playlistSongs?.title) : "", 30)}</div>
                        </div>
                        {/* {song?.artistMap?.primary_artists?.map((primaryArtist)=>{
                               
                            })} */}
                        <div title={playlistSongs?.more_info?.primary_artists_label ? playlistSongs?.more_info?.primary_artists_label : playlistSongs?.subtitle} className="text-gray-500">{truncate(playlistSongs?.more_info?.primary_artists_label ? playlistSongs?.more_info?.primary_artists_label : playlistSongs?.subtitle, 25)} | {playlistSongs?.year}
                        </div>
                        <div className="float-right -mt-4">
                            <AccessTimeIcon className="text-xs lg:text-xs md:text-xs transition duration-200 ease-in
                                 text-gray-400 cursor-pointer " />
                            <span className=" transition duration-200 ease-in text-gray-400 cursor-pointer text-xs lg:text-md md:text-md">{duration(playlistSongs?.more_info?.duration)}</span>

                        </div>
                        <div className="flex space-x-2 song__level__actions  align-middle">
                            <ShareIcon onClick={(e) => toggleModal(e, true, playlistSongs)} className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100" />
                            <FavoriteBorderIcon
                                className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
                            />
                            <MoreHorizIcon onClick={(e) => openMoreOptionsPopOver(e, true, playlistSongs)}
                                className=" transition duration-200 ease-in text-gray-500 cursor-pointer text-xs lg:text-md md:text-md hover:text-gray-100"
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
                                <PlayerMoreOptions openedFromPlaylist={true} onClosed={closeMoreOptionsPopOver} />
                            </Popover>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div >);

}

export default SongContent;

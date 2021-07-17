import React, { useState } from "react";
import "./Search.css";
import axios from "./axios";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { truncate, randomKeyWord, noImage } from "./utility"
import { artists } from "./requests"

function Search({ isSuggestionOpened, toggleSearchWindow }) {
    const [songSuggestions, setSongSuggestions] = useState([])
    const [playlistsSuggestions, setPlaylistsSuggestions] = useState([])
    const [albumsSuggestion, setAlbumsSuggestion] = useState([])
    const [topArtistsSuggestions, setTopArtistsSuggestions] = useState([])
    const [searchText, setSearchText] = useState("");
    const search = (e) => {
        e.preventDefault();
        getData(e)
    };
    const pollForCachedResults = (e) => {
        if (searchText.length === 0) {
            toggleSearchWindow(false)
            setSongSuggestions([])
            setPlaylistsSuggestions([])
            setAlbumsSuggestion([])
            setTopArtistsSuggestions([])
            return;

        }
        if (searchText.length < 5) {
            toggleSearchWindow(false)
            return
        }
        toggleSearchWindow(true)
    }
    const getData = (e) => {
        setSearchText(e.target.value)
        if (searchText.length === 0 || searchText.length < 5) {
            toggleSearchWindow(false)
            setSongSuggestions([])
            setPlaylistsSuggestions([])
            setAlbumsSuggestion([])
            setTopArtistsSuggestions([])
            return;
        }
        let promises = []

        promises.push(
            axios.get('search?query=' + searchText).then((response) => {
                Promise.all(promises).then(() => {
                    renderResults(setSongSuggestions, response, setPlaylistsSuggestions, setAlbumsSuggestion, toggleSearchWindow, songSuggestions, setTopArtistsSuggestions);
                });

            }).catch((error) => {
                toggleSearchWindow(false)
                console.error("Failed!", error);
            })
        );

    }


    return (
        <div className="justify-center text-gray-200">
            <form onSubmit={(e) => search(e)} className="flex flex-grow mt-12 ">
                <SearchIcon className="text-gray-400 mt-1" />
                <TextField
                    fullWidth={true}
                    value={searchText}
                    className="search__input"
                    onClick={(e) => pollForCachedResults(e)}
                    onChange={(e) => getData(e)}
                    placeholder="Search by music, artist, playlists.."
                />
                <button type="submit">Send Message</button>
            </form>
            {isSuggestionOpened && (
                <div className="suggestBox w-full  z-30 h-auto lg:text-lg md:text-sm text-xs  text-black">
                    {songSuggestions?.length > 0 && (<div className="text-gray-300 antialiased 
                            sm:subpixel-antialiased md:antialiased   px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline">TOP SONGS</div>)}
                    {/* SONGS RESULTS */}
                    <div className=" suggestBox__songs grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {songSuggestions?.map((songSuggestion, index) => (
                            <div title={songSuggestion?.title} className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group 
                          hover:bg-blue-600 " key={songSuggestion?.id}>
                                <div><img
                                    alt={songSuggestion?.title} src={songSuggestion?.image} className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"/></div>

                                <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                    <div className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold   group-hover:text-white
                         ">{truncate(songSuggestion?.title, 20)}</div>

                                    <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">

                                        {truncate(songSuggestion?.album, 20)} | {songSuggestion.songDetail?.year}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* PLAYLIST RESULTS */}
                    {playlistsSuggestions?.length > 0 && (<div className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline">

                        RELATED PLAYLISTS</div>)}

                    <div className=" suggestBox__playlists grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-sans ">
                        {playlistsSuggestions?.map((playlistSuggestion, index) => (
                            <div title={playlistSuggestion?.title} className="px-2 py-1 font-sans flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                                key={playlistSuggestion?.id}>

                                <div><img
                                    alt={playlistSuggestion?.title} src={playlistSuggestion?.image} className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"/></div>

                                <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2  ">
                                    <div className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         ">{truncate(playlistSuggestion?.title, 20)}</div>
                                    <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">

                                        {playlistSuggestion.songs.length} songs</div>
                                </div>

                            </div>

                        ))}
                    </div>

                    {/* ALBUM RESULTS */}
                    {albumsSuggestion?.length > 0 && (<div className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline">RELATED ALBUMS</div>)}
                    <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {albumsSuggestion?.map((albumSuggestion, index) => (
                            <div title={albumSuggestion?.title} className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                                key={albumSuggestion?.id}>
                                <div ><img
                                    alt={albumSuggestion?.title} src={albumSuggestion?.image} className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"/></div>

                                <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                    <div className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         ">{truncate(albumSuggestion?.title, 20)}</div>
                                    <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">

                                        {truncate(albumSuggestion?.music, 40)} | {albumSuggestion?.more_info.year}</div>
                                </div>

                            </div>

                        ))}
                    </div>
                    {/* ARTIST RESULTS */}
                    {topArtistsSuggestions?.length > 0 && (<div className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline">RELATED ARTISTS</div>)}
                    <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {topArtistsSuggestions?.map((topArtist, index) => (
                            <div title={topArtist?.name} className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                                key={topArtist?.index}>
                                <div ><img
                                    alt={topArtist?.name} src={topArtist?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"/></div>

                                <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                    <div className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         ">{truncate(topArtist?.name, 30)}</div>


                                    <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">

                                        {topArtist?.type} </div>

                                </div>

                            </div>

                        ))}
                    </div>
                </div>)}
        </div >
    );
}

export default Search;
function renderResults(setSongSuggestions, response, setPlaylistsSuggestions, setAlbumsSuggestion, toggleSearchWindow, songSuggestions, setTopArtistsSuggestions) {
    setSongSuggestions(response.data[0]?.songs);
    setPlaylistsSuggestions(response.data[0]?.playlists);
    setAlbumsSuggestion(response.data[0]?.albums);
    toggleSearchWindow(true);
    // take this entire thing to node service
    let artistsMap = [];
    songSuggestions.forEach((song, index) => {
        artistsMap.push(song.songDetail.primary_artists);
    });
    let top_artist = randomKeyWord(artistsMap);

    let top_artist_array = top_artist?.split(",");
    let modified_top_artist_array = [];
    if (top_artist_array === [] || top_artist_array?.length === 0) {
        modified_top_artist_array.push({ name: top_artist });
    }
    else {
        top_artist_array?.forEach((topArtist) => {
            modified_top_artist_array.push({ name: topArtist });
        });

    }
    let found = false;

    modified_top_artist_array.forEach((modified_Artist, _mindex) => {
        artists[0]?.INDIAN.forEach((artist, index) => {
            if (artist?.name.trim() === modified_Artist.name.trim()) {
                modified_top_artist_array[_mindex] = { name: modified_Artist.name.trim(), image: artist.url, type: artist.type };
                found = true;
            }

        });
    });
    if (!found) {
        modified_top_artist_array.forEach((modified_Artist, _mindex) => {
            artists[1]?.WESTERN.forEach((artist) => {
                if (artist?.name.trim() === modified_Artist.name.trim()) {
                    modified_top_artist_array[_mindex] = { name: modified_Artist.name.trim(), image: artist.url, type: artist.type };
                    found = true;
                }
            });
        });
    }

    modified_top_artist_array?.forEach((modified_Artist, _mindex) => {
        if (modified_Artist?.image === undefined) {
            modified_top_artist_array[_mindex] = { name: modified_Artist.name, image: noImage, type: "Unavailable" };
        }
    });

    setTopArtistsSuggestions(modified_top_artist_array);
}


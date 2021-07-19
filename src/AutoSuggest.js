import React from 'react'
import { truncate, noImage, capitalizeFirstLetter } from "./utility";
import "./AutoSuggest.css";

function AutoSuggest({ songSuggestions, playlistsSuggestions, albumsSuggestion, topArtistsSuggestions }) {

    return (
        <div>
            <div className="suggestBox w-full  z-30 h-auto lg:text-lg md:text-sm text-xs  text-black">
                {songSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300 antialiased 
                            sm:subpixel-antialiased md:antialiased   px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        TOP SONGS
                    </div>
                )}
                {/* SONGS RESULTS */}
                <div className=" suggestBox__songs grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {songSuggestions?.map((songSuggestion, index) => (
                        <div
                            title={songSuggestion?.title}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group 
                          hover:bg-blue-600 "
                            key={songSuggestion?.id}
                        >
                            <div>
                                <img
                                    alt={songSuggestion?.title}
                                    src={songSuggestion?.image === "(unknown)" ? noImage : songSuggestion?.image}

                                    className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold   group-hover:text-white
                         "
                                >
                                    {truncate(songSuggestion?.title, 20)}
                                </div>

                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {truncate(songSuggestion?.album, 20)} |{" "}
                                    {capitalizeFirstLetter(songSuggestion.more_info.language)} |{" "}
                                    {songSuggestion.songDetail?.year}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* PLAYLIST RESULTS */}
                {playlistsSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED PLAYLISTS
                    </div>
                )}

                <div className=" suggestBox__playlists grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-sans ">
                    {playlistsSuggestions?.map((playlistSuggestion, index) => (
                        <div
                            title={playlistSuggestion?.title}
                            className="px-2 py-1 font-sans flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={playlistSuggestion?.id}
                        >
                            <div>
                                <img
                                    alt={playlistSuggestion?.title}

                                    src={playlistSuggestion?.image === "(unknown)" ? noImage : playlistSuggestion?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2  ">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(playlistSuggestion?.title, 20)}
                                </div>
                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {capitalizeFirstLetter(playlistSuggestion.language)} | {" "}{playlistSuggestion.songs.length} songs
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ALBUM RESULTS */}
                {albumsSuggestion?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED ALBUMS
                    </div>
                )}
                <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {albumsSuggestion?.map((albumSuggestion, index) => (
                        <div
                            title={albumSuggestion?.title}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={albumSuggestion?.id}
                        >
                            <div>
                                <img
                                    alt={albumSuggestion?.title}

                                    src={albumSuggestion?.image === "(unknown)" ? noImage : albumSuggestion?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(albumSuggestion?.title, 20)}
                                </div>
                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {truncate(albumSuggestion?.music, 40)} |{" "}
                                    {capitalizeFirstLetter(albumSuggestion?.more_info.language)} | {" "}
                                    {albumSuggestion?.more_info.year}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* ARTIST RESULTS */}
                {topArtistsSuggestions?.length > 0 && (
                    <div
                        className="text-gray-300  antialiased 
                            sm:subpixel-antialiased md:antialiased    px-4 py-4 font-semibold uppercase text-xs lg:text-md md:text-md underline"
                    >
                        RELATED ARTISTS
                    </div>
                )}
                <div className=" suggestBox__albums font-sans  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {topArtistsSuggestions?.map((topArtist, index) => (
                        <div
                            title={topArtist?.name}
                            className="px-2 py-1 font-sans  flex flex-grow cursor-pointer group   hover:bg-blue-600 "
                            key={topArtist?.index}
                        >
                            <div>
                                <img
                                    alt={topArtist?.name}

                                    src={topArtist?.image}
                                    className="
                transition duration-450 transform hover:scale-110 object-contain rounded-full w-12 h-12"
                                />
                            </div>

                            <div className="flex-column group-hover:text-white  font-sans mt-2 ml-3 lg:ml-2 lg:mt-0 md:mt-0 md:ml-2">
                                <div
                                    className="searchresult__title align-middle overflow-ellipsis antialiased 
                            sm:subpixel-antialiased md:antialiased font-semibold group-hover:text-white
                         "
                                >
                                    {truncate(topArtist?.name, 30)}
                                </div>

                                <div className="text-gray-400 lg:text-sm md:text-sm text-xs group-hover:text-gray-200">
                                    {topArtist?.type}{" "}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AutoSuggest

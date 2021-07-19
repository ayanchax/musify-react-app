import React from "react";
import "./SongCredit.css";
import { capitalizeFirstLetter } from "./utility"
const SongCredit = ({ songData }) => {
    if (songData !== undefined) {
        return (
            <div className="text-gray-200 text-xs lg:text-sm flex space-x-16 flex-1">
                <div className="flex-column">
                    <div className="songcredit__title">
                        <h3 className="songcredit__header">Title</h3>
                        <span>{songData?.song}</span>
                    </div>

                    <div className="songcredit__artist">
                        <h4 className="songcredit__header">Artists</h4>

                        {Object.keys(songData?.artistMap).map((artistKeyName, i) => (
                            <div>{artistKeyName}</div>
                        ))}
                    </div>




                    <div className="songcredit__album">
                        <h5 className="songcredit__header">Album</h5>
                        <span>{songData?.album}</span>
                    </div>
                    <div className="songcredit__genre">
                        <h5 className="songcredit__header">Language &amp; Year</h5>
                        {capitalizeFirstLetter(songData?.language)} | {songData?.year}
                    </div>

                    <div className="songcredit__othercomments">
                        {songData?.copyright_text ? (
                            <h5 className="songcredit__header">Copyrights</h5>
                        ) : (
                            ""
                        )}
                        <span className="songcredit__comments">
                            {songData?.copyright_text}
                        </span>
                    </div>
                </div>
                <div className="flex-end">
                    <img
                        className="object-contain md:w-72 md:h-72 w-52 h-52 lg:w-96 lg:h-96 align-middle"
                        src={songData?.image}
                        alt="SongContentImage"
                    />
                </div>
            </div>
        );
    }
    return null;
};

export default SongCredit;

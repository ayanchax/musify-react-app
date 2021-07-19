import React from "react";
import "./SongCredit.css";
import parse from "html-react-parser"
import { capitalizeFirstLetter } from "./utility"
const SongCredit = ({ songData }) => {
    if (songData !== undefined) {
        return (
            <div className="text-gray-200 text-xs lg:text-sm flex-column justify-center ml-7 lg:ml-20">

                <div className="flex-start justify-center">
                    <img
                        className="object-contain md:w-72 md:h-72 w-52 h-52 lg:w-96 lg:h-96 align-middle"
                        src={songData?.image}
                        alt="SongContentImage"
                    />
                </div>
                <div>
                    <div className="songcredit__title">
                        <h3 className="songcredit__header">Title</h3>
                        <span>{parse(songData?.song)}</span>
                    </div>
                    <div className="songcredit__album">
                        <h5 className="songcredit__header">Album</h5>
                        <span>{songData?.album}</span>
                    </div>

                    <div className="songcredit__artist">
                        <h4 className="songcredit__header">Artists</h4>

                        {Object.keys(songData?.artistMap).map((artistKeyName, i) => (
                            <div>{parse(artistKeyName)}</div>
                        ))}
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

            </div>
        );
    }
    return null;
};

export default SongCredit;

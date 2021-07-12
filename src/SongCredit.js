import React from 'react'
import "./SongCredit.css";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
const SongCredit = ({ songData }) => {

    if (songData !== undefined) {
        return (
            <div className="songcredit">
                <div className="songcredit__title">
                    <h3 className="songcredit__header">Title</h3>
                    <span>{songData?.metadata?.format?.tags?.title}</span>

                </div>

                <div className="songcredit__artist">
                    <h4 className="songcredit__header">Artist</h4>
                    <span>
                        {songData?.metadata?.format?.tags?.artist}
                    </span>
                </div>

                <div className="songcredit__album">
                    <h5 className="songcredit__header">Album</h5>
                    <span>
                        {songData?.metadata?.format?.tags?.album}
                    </span>

                </div>
                <div className="songcredit__genre">

                    {songData?.metadata?.format?.tags?.genre ? (<h5 className="songcredit__header">Genre</h5>) : ("")}
                    {songData?.metadata?.format?.tags?.genre}
                </div>

                <div className="songcredit__othercomments">

                    {songData?.metadata?.format?.tags?.comment ? (<h5 className="songcredit__header">Comments</h5>) : ("")}
                    <span className="songcredit__comments">{songData?.metadata?.format?.tags?.comment}</span>
                </div>


            </div>
        )
    }
    return null;
}

export default SongCredit

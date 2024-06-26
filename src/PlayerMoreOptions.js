import React, { useState, useEffect } from "react";

import { CopyToClipboard } from 'react-copy-to-clipboard';
import GenericDialog from "./GenericDialog";
import "./PlayerMoreOptions.css";
import { useDataLayerContextValue } from "./DataLayer";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import SongCredit from "./SongCredit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function PlayerMoreOptions({ openedFromPlaylist, onClosed }) {
    const [{ currentSongPlaying }, dispatch] = useDataLayerContextValue();
    const [{ selectedSongNeedle }, dispatch_v2] = useDataLayerContextValue();
    const [showGenericModal, updateGenericModal] = useState(false);
    const [header, setHeader] = useState("");
    const [footer, setFooter] = useState("");
    const [bodyComponent, setBodyComponent] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [copiedSongLink, setCopiedSongLink] = useState(false);
    const [dialogIcon, setDialogIcon] = useState("");
    const toggleGenericModal = (icon, h, b, bt, f, isComingFromDataNode) => {
        if (isComingFromDataNode) {
            setDialogIcon(icon);
            setHeader(h);
            setBodyComponent(b);
            setBodyText(bt);
            setFooter(f);
        }
        updateGenericModal((state) => !state);
    };

    useEffect(() => {
        if (copiedSongLink) {
            toast.success("Song link copied!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });

            setCopiedSongLink(false)
        }


    }, [copiedSongLink]);

    const copyLink = (e) => {

    }
    return (
        <div className="playermoreoptions">
            <GenericDialog
                dialogIcon={dialogIcon}
                header={header}
                bodyComponent={bodyComponent}
                bodyText={bodyText}
                footer={footer}
                additionalData={
                    openedFromPlaylist ? selectedSongNeedle : currentSongPlaying
                }
                isOpen={showGenericModal}
                updateModalState={(e) =>
                    toggleGenericModal(null, null, null, null, null, false)
                }
                onComponentClosed={onClosed}
            />
            <li className="player__moreOptionsList" role="presentation">
                Add to Queue
            </li>
            <hr className="player__horizontalBar" />
            <li className="player__moreOptionsList" role="presentation">
                Go to Album
            </li>
            <hr className="player__horizontalBar" />
            <li
                className="player__moreOptionsList"
                onClick={(e) =>
                    toggleGenericModal(
                        <MusicNoteIcon />,
                        "Song Credits",
                        <SongCredit
                            songData={
                                openedFromPlaylist ? selectedSongNeedle : currentSongPlaying
                            }
                        />,
                        null,
                        "Musify | 2021",
                        true
                    )
                }
                role="presentation"
            >
                Show Credits
            </li>
            <hr className="player__horizontalBar" />
            <li className="player__moreOptionsList" role="presentation">
                Add to Playlist
            </li>
            <hr className="player__horizontalBar" />
            <li className="player__moreOptionsList" role="presentation">
                <CopyToClipboard text={openedFromPlaylist ? "https://musify-7ba7c.web.app/song/" + selectedSongNeedle?.id + "/" + selectedSongNeedle?.title : "https://musify-7ba7c.web.app/song/" + currentSongPlaying?.id + "/" + currentSongPlaying?.title}
                    onCopy={() => setCopiedSongLink(true)}>
                    <span>Copy Song Link</span>
                </CopyToClipboard>
            </li>

            <hr className="player__horizontalBar" />
            <li className="player__moreOptionsList" role="presentation">
                Show Lyrics
            </li>
        </div>
    );
}

export default PlayerMoreOptions;

import React from 'react'
import HeaderOption from "./HeaderOption";
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
function HeaderActions() {
    return (

        <div className="header__actions">
            <HeaderOption title="Your Library" Icon={LibraryMusicIcon} />
            <HeaderOption title="Create Playlist" Icon={AddIcon} />
            <HeaderOption title="Liked Songs" Icon={FavoriteIcon} />
        </div>

    )
}

export default HeaderActions

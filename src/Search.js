
import React, { useState } from "react";
import "./Search.css";
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

function Search() {
    const search = (e) => {
        e.preventDefault();
        console.log(searchText);
        setSearchText("")
    }
    const [searchText, setSearchText] = useState("");
    return (
        <div className="search">
            <form onSubmit={(e) => search(e)} className="search__form">
                <SearchIcon className="search__icon" />
                <TextField fullWidth={true} value={searchText} className="search__input" onChange={(e) => setSearchText(e.target.value)} placeholder="Search by music,artist,genre.." />
                <button type="submit" >
                    Send Message
                </button>
            </form>


        </div>
    )
}

export default Search

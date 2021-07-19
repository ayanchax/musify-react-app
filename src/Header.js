import React, { useState } from "react";
import "./Header.css";
import logo from "./assets/logo/logo.png";
import { useDataLayerContextValue } from "./DataLayer";
import Popover from "@material-ui/core/Popover";
import { actionTypes } from "./reducer";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const [user, dispatch] = useDataLayerContextValue();
    const [{ }, dispatch_signOut] = useDataLayerContextValue();
    const closeAccountPopOver = (event) => {
        setAnchorEl(null);
    };
    const signOutUser = (e) => {
        e.preventDefault();

        auth.signOut().then(function () {
            dispatch_signOut({
                type: actionTypes.SET_USER,
                user: null,
            })
            dispatch({
                type: actionTypes.SET_USER,
                user: null,
            })
            toast.success("You are now signed out!!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
            document.title = "Musify"
        }).catch(function (error) {
            toast.error("Some error occured during sign out", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
        });
    }
    const openAccountPopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <header className="header fixed flex h-12 top-0 w-full z-10 justify-between ">
            <img
                onClick={(e) => window.location.reload()}
                className="fixed object-contain cursor-pointer w-36 left-0 top-1"
                src={logo}
                alt="Musify-Logo"
            />


            <img onClick={(e) => openAccountPopOver(e)}

                className="fixed right-5 w-8 object-contain mt-2 cursor-pointer"
                src={user?.user?.photoURL} title={user?.user?.displayName}
                alt={user?.user?.displayName}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={(e) => closeAccountPopOver(e)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >

                <li onClick={e => signOutUser(e)} className="header__userAccountOptions" role="presentation">
                    Sign out
                </li>


            </Popover>
        </header>
    );
}

export default Header;

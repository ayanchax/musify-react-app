import React from "react";
import "./Header.css";
import logo from "./assets/logo/logo.png";

function Header() {
    return (
        <div className="header">
            <img
                onClick={(e) => window.location.reload()}
                className="header__logo"
                src={logo}
                alt="Musify-Logo"
            />
            <img
                className="header__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Musify-User-Avatar"
            />


        </div>
    );
}

export default Header;

import React from "react";
import "./Header.css";
import logo from "./assets/logo/logo.png";


function Header() {
    return (
        <header className="header fixed flex h-12 top-0 w-full z-10 justify-between ">
            <img
                onClick={(e) => window.location.reload()}
                className="fixed object-contain cursor-pointer w-36 left-0 top-1"
                src={logo}
                alt="Musify-Logo"
            />
            <img
                className="fixed right-5 w-8 object-contain mt-2"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Musify-User-Avatar"
            />
        </header>
    );
}

export default Header;

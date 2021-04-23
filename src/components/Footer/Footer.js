import "./Footer.scss";

import React from 'react';
import Logo from "../Logo";
import Navigation from "../Navigation";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <Logo class="white"/>
                <Navigation class="white"/>
            </div>
        </footer>
    );
};

export default Footer;
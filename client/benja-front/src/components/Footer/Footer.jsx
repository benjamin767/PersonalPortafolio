import React from "react";
import "./Footer.css";

const Footer = () => {
    return (<footer>
        <span>Benjamin Miño</span>
        <div className="initials"><span>B</span>M</div>
        <ul>
            <li> <ion-icon name="logo-linkedin"></ion-icon> Linkedin </li>
            <li> <ion-icon name="mail-outline"></ion-icon> Gmail </li>
            <li><ion-icon name="logo-github"></ion-icon> Github </li>
        </ul>
    </footer>);
};

export default Footer;
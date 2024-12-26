import React from "react";
import "./Footer.css";
import { useSelector } from "react-redux";

const Footer = () => {
    const [ page ] = useSelector( state => state.principal_page)
    return (<footer>
        { page ? <>
            <span>Benjamin Miño</span>
            <div className="initials"><span>B</span>M</div>
            <ul>
                <li> <ion-icon name="logo-linkedin"></ion-icon> 
                    <a href={page.linkedin || "Benjamin Miño"} target="_blank"> Linkedin </a>
                </li>
                <li> <ion-icon name="mail-outline"></ion-icon>
                <a href={"mailto:" + page.email || "Benjamin Miño"} target="_blank"> Gmail </a> </li>
                <li><ion-icon name="logo-github"></ion-icon>
                <a href={page.github || "Benjamin Miño"} target="_blank"> Github </a> </li>
            </ul>
        </> : null}
    </footer>);
};

export default Footer;
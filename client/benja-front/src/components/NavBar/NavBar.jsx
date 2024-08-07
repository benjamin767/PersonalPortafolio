import React from "react";
import "./NavBar.css";

const NavBar = () => {
    return (<header>
    <nav>
        <div className="img"></div>
        <div className="initials"><span>B</span>M</div>
        <ul>
            <li> 
                Sobre Mi
            </li>
            <li>
                Proyectos
            </li>
            <li>
                Contacto
            </li>
        </ul>
    </nav>
    </header>);
}

export default NavBar;
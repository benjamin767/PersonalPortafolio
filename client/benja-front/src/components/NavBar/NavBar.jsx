import React from "react";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {

    const { pathname } = useLocation();
    const handleClick = (idComponent) => {
        const compponent = document.getElementById(idComponent);
        compponent.scrollIntoView({
            behavior: "smooth"
        })
    };
    console.log(pathname)

    return (<header>
        <nav>
            <div className="img"></div>
            <div className="initials"><span>B</span>M</div>
            <ul>
                { 
                pathname === "/" ? <>
                    <Link 
                        to="#about-me"
                        onClick={() => handleClick("about-me")}
                    >
                        <li> 
                            Sobre Mi
                        </li>
                    </Link>
                    <Link 
                        to="#project-container"
                        onClick={() => handleClick("project-container")}
                    >
                        <li>
                            Proyectos
                        </li>
                    </Link> </> 
                    : <>
                    <Link 
                        to="/#about-me"
                    >
                        <li> 
                            Sobre Mi
                        </li>
                    </Link>
                    <Link 
                        to="/#project-container"
                    >
                        <li>
                            Proyectos
                        </li>
                    </Link> 
                    </> 
                }
                <Link to="/register">
                    <li>
                        Contacto
                    </li>
                </Link>
            </ul>
        </nav>
    </header>);
}

export default NavBar;
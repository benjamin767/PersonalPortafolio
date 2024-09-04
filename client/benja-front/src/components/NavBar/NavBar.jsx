import React, { useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from 'react-modal';

const NavBar = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [ isOpen, setIsOpen ] = useState(false);
    const userID = useSelector(state => state.profile ? state.profile.id : null );
    const handleClick = (idComponent) => {
        const compponent = document.getElementById(idComponent);
        compponent.scrollIntoView({
            behavior: "smooth"
        })
    };

    const handleLogout = () => {
        setIsOpen(true);
    };

    const handleSuccess = async () => {
        await dispatch(logout())
        .then(() => navigate("/"));
        setIsOpen(false);
    };

    return (<header>
        <nav>
            { userID ? <ul>
                <Link to="/profile">
                    <div className="register-button">Perfil</div>
                </Link> 
                <button 
                    className="register-button"
                    onClick={ async () => await handleLogout() }
                >
                    Logout
                </button>
            </ul> : <ul> 
                <Link to="/register">
                    <div className="register-button">¡Registrate!</div>
                </Link> 
                <Link 
                    to="/login"
                    className="login-redirect"
                >
                    Ingresar
                </Link>
            </ul> }
            <Link to="/">
                <div className="initials"><span>B</span>M</div>
            </Link>
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
                <Link to="/contact">
                    <li>
                        Contacto
                    </li>
                </Link>
            </ul>
        </nav>
        <ReactModal
            isOpen={isOpen}
            shouldCloseOnEsc={false}
            ariaHideApp={false}
            data={
                { background: "dark" }
            }
            style={{
                overlay: {
                    position: "fixed",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    zIndex: 4
                },  
                content: {
                    position: 'absolute',
                    color: "#aaa",
                    top: '35%',
                    left: '20%',
                    right: '20%',
                    bottom: '35%',
                    border: '1px solid #444',
                    background: '#111',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    textAlign: "center"
                }
            }}
        >
            <>
                <p>Esperamos verte pronto, ¡exitos!</p> 
                <button 
                    className="ok"
                    onClick={() => handleSuccess()}
                >OK</button>
            </>
        </ReactModal>
    </header>);
}

export default NavBar;
import React from 'react';
import "./AboutMe.css";
import ImgCanvas from '../ImgCanvas/ImgCanvas';
import { useSelector } from 'react-redux';
import Loading from "../Loading/Loading"

const AboutMe = () => {
    const [ principal_page ] = useSelector(state => state.principal_page);

    return (<> { !principal_page ? <Loading id="about-me"/> :
        <section id="about-me">
            <ImgCanvas/>
            <div className="description-container">
                <h1 className="title">Portafolio del Sr <span>{principal_page.name.charAt(0)}</span>{principal_page.name.slice(1)} <span>{principal_page.surname.charAt(0)}</span>{principal_page.surname.slice(1)}</h1>
                <p>
                    { principal_page.description }
                </p>
            </div>
        </section>
    } </>);
};

export default AboutMe;
import React from 'react';
import "./AboutMe.css";
import ImgCanvas from '../ImgCanvas/ImgCanvas';

const AboutMe = () => {
    return (<section id="about-me">
        <ImgCanvas/>
        <div className="description-container">
            <h1 className="title">Portafolio del Sr <span>B</span>enjamin <span>M</span>iño</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Repellat et rem numquam dolorem. Nemo natus nam similique cumque eveniet laborum ipsam architecto 
                quibusdam deserunt quam? 
                Eveniet delectus illum quod officia!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Repellat et rem numquam dolorem. Nemo natus nam similique cumque eveniet laborum ipsam architecto 
                quibusdam deserunt quam? 
                Eveniet delectus illum quod officia!
            </p>
        </div>
    </section>);
};

export default AboutMe;
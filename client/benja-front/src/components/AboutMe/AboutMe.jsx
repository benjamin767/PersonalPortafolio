import React from "react";
import "./AboutMe.css";

const AboutMe = () => {
    return (<section className="about-me">
        <div className="img-profile">
            <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQytg1EK3tnFPPWkfpv06FvWtQ9A7IvteLQLj49jVv_qw&s"
            alt="me"
            />
        </div>
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
import React, { useState } from "react";
import "./Home.css"
import AboutMe from "../AboutMe/AboutMe";
import ProjectContainer from "../ProjectContainer/ProjectContainer";
import Contact from "../Contact/Contact";

const Home = () => {
    const [ input, setInput]  = useState({});
    return (<>
        <AboutMe/>
        <ProjectContainer projects={[3,3,3]}/>
        <Contact/>
    </>);
};

export default Home;
import React, { useState } from "react";
import "./Home.css"
import AboutMe from "../AboutMe/AboutMe";
import ProjectContainer from "../ProjectContainer/ProjectContainer";
import Contact from "../Contact/Contact";

const Home = () => {
    const [ input, setInput]  = useState({});
    return (<>
        <ProjectContainer projects={[3,3,3]}/>
        <AboutMe/>
        <Contact/>
    </>);
};

export default Home;
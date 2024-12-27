import React from "react";
import "./Home.css"
import AboutMe from "../AboutMe/AboutMe";
import ProjectContainer from "../ProjectContainer/ProjectContainer";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";

const Home = () => {
    const principal = useSelector(state => state.principal_page[0]);

    return (<>
        {console.log(principal)}
        <ProjectContainer projects={principal.projects}/>
        <AboutMe/>
        <Contact/>
    </>);
};

export default Home;
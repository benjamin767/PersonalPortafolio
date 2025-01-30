import React from "react";
import "./Home.css"
import AboutMe from "../AboutMe/AboutMe";
import ProjectContainer from "../ProjectContainer/ProjectContainer";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const Home = () => {
    const principal = useSelector(state => state.principal_page[0]);

    return (<>
        {principal ?  <ProjectContainer projects={principal.projects}/> : <Loading/> }
        <AboutMe/>
        <Contact/>
    </>);
};

export default Home;
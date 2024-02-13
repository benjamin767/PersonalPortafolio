import React, { useState } from "react";
import "./Home.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";
import ProjectContainer from "../ProjectContainer/ProjectContainer";

const Home = () => {
    const dispatch = useDispatch();
    const [ input, setInput]  = useState({});
    return (<>
        <NavBar/>
        <AboutMe/>
        <ProjectContainer projects={[3,3,3]}/>
        <Footer/>
    </>);
};

export default Home;
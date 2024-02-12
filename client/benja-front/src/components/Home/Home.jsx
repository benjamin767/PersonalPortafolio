import React, { useState } from "react";
import "./Home.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import AboutMe from "../AboutMe/AboutMe";

const Home = () => {
    const dispatch = useDispatch();
    const [ input, setInput]  = useState({});
    return (<>
        <NavBar/>
        <AboutMe/>
        <Footer/>
    </>);
};

export default Home;
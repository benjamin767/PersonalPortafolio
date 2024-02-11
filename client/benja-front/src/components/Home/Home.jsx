import React, { useState } from "react";
import "./Home.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

const Home = () => {
    const dispatch = useDispatch();
    const [ input, setInput]  = useState({});
    return (<>
        <NavBar/>
        <h1>En verdad es que esto va ser un login por el momento.</h1>
        <Footer/>
    </>);
};

export default Home;
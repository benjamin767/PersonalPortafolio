import React, { useState } from "react";
import "./Home.css"
import { createUser } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Home = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: "",
        name: "",
        pasword: ""
    });
    const handleChange = (event) => { 
        event.preventDefault();
        setInput( { ...input, [event.target.name]: event.target.value } );
    }; 
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(createUser(input));
    };
    return (<>
        <h1>En verdad es que esto va ser un login por el momento.</h1>
    </>);
};

export default Home;
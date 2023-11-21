import React, { useState } from "react";
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
        console.log(input)
    }; 
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(createUser(input));
    };
    return (<>
        <h1>En verdad es que esto va ser un login por el momento.</h1>
        <form>
            <label>Email </label> <input 
                onChange={(e) => handleChange(e)}
                type="email"
                name="email"
            />
            <label>Nombre completo </label> <input 
                onChange={(e) => handleChange(e)}
                name="name"
            />
            <label>Password </label> <input 
                onChange={(e) => handleChange(e)}
                type="password"
                name="password"
            />
            <button
                onClick = {(e) => handleClick(e)}
            >
                Button log in
            </button>
        </form>
    </>);
};

export default Home;
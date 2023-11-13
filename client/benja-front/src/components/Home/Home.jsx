import React, { useState } from "react";


const Home = () => {
    const [input, setInput] = useState({
        name: "",
        password: ""
    });
    const handleChange = (event) => { 
        event.preventDefault();
        setInput( { ...input, [event.target.name]: event.target.value } );
    }; 
    const handleClick = () => {};
    return (<>
        <h1>En verdad es que esto va ser un login por el momento.</h1>
        <label>User </label> <input onChange={(e) => handleChange(e)}/>
        <label>Password </label> <input></input>
        <button style={{
            border: "1px solid blue", 
            height: "20px", 
            width: "100px",
            marginInline: "2px"}}
            onClick = {handleClick()}
        >
            Button log in
        </button>
    </>);
};

export default Home;
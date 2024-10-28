import "./CreateTech.css";
import React, { useState } from "react";
import ImgCanvas from "../ImgCanvas/ImgCanvas";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "../Error12345/Error";
import { createTech } from "../../redux/actions";

const CreateTech = () => {
    const [ input, setInput ] = useState({
        name: "",
        image: ""
    });
    const dispatch = useDispatch();
    const { id } = useSelector(state => state.profile);

    const handleChange = (event) => {
        event.preventDefault();
        setInput({ ...input, [event.target.name]: event.target.value });
    };
    const handleClick = (event, input) => {
        event.preventDefault();
        dispatch(createTech(input));
    };
    return (<>    
        <ImgCanvas/>
        { id ? <>
            <section className="create-tech">
                <h1>Agregar una Tecnologia</h1>
                <form>
                    <aside>Nombre de la tencnologia</aside>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                    />
                    <aside>Imagen</aside>
                    <input
                        type="file"
                        name="image"
                        accept="image/jpeg"
                        value={input.image}
                        onChange={handleChange}
                    />
                    <button
                        className="edit-button"
                        onClick={handleClick}
                    >
                        CREAR
                    </button>
                </form>
            </section>
        </> 
        :
        <Error404/> }
    </>);
};

export default CreateTech;
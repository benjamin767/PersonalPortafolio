import React, { useState } from "react";
import "./CreateProject.css";
import ImgCanvas from "../ImgCanvas/ImgCanvas";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "../Error12345/Error";
import { createProject } from "../../redux/actions";

const CreateProject = () => {
    const profile = useSelector(state => state.profile);
    const[ input, setInput ] = useState({
        title: "",
        image: "asdasdasdasdasdasd",
        description: ""
    });
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setInput({...input, [event.target.name]: event.target.value})
    };
    const handleClick = (event) => {
        event.preventDefault();
        createProject(dispatch(createProject(input)));
    };

    return (<> <ImgCanvas/>
    { profile.id ? 
        <>
            <main className="main-create-project">
                <h2>Crear Proyecto</h2>
                <form id="form-create-project">
                    <div>
                        <aside>Titulo</aside> 
                        <input
                            name="title"
                            value={ input.title }
                            onChange={ handleChange }
                        />
                    </div>
                    <div>
                        <aside>Imagenes</aside> 
                        <input 
                            type="file" 
                            accept="image/jpeg" 
                            multiple
                        />
                    </div>
                    <div>
                        <aside>Descipcion</aside> 
                        <textarea
                            name="description"
                            value={input.description}
                            onChange={ handleChange }
                        />
                    </div>
                        <button
                            className="edit-button"
                            onClick={handleClick}
                        >
                            Crear
                        </button>
                </form>
            </main> 
        </> : <Error404/>
    }
    </>);
};

export default CreateProject;
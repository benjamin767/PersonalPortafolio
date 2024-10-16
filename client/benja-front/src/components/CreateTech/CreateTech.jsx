import "./CreateTech.css";
import React, { useState } from "react";
import ImgCanvas from "../ImgCanvas/ImgCanvas";
import { useDispatch, useSelector } from "react-redux";
import Error404 from "../Error12345/Error";
import { createTech } from "../../redux/actions";

const CreateTech = () => {
    return (<>
        <ImgCanvas/>
        <section>
            <h1>Agregar una Tecnologia</h1>
        </section>
    </>);
};

export default CreateTech;
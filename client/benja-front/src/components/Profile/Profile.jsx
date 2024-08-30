import React from "react";
import "./Profile.css";
import DataProjects from "../DataProjects/DataProjects";
import { useSelector } from "react-redux";
import ImgCanvas from "../ImgCanvas/ImgCanvas";

const Profile = () => {
    const { profile } = useSelector(state => state)
    return (<div className="profile">
        <main>
            <h2>Proyectos:</h2>
            <div className="prjects-data">
                <DataProjects/>
                <DataProjects/>
                <DataProjects/>
            </div>
        </main>
        <aside className="profile-data">
            <h2>Datos proporcionados:</h2>
            <ul>
                <li>Nombres: <span>{profile.name}</span></li>
                <li>Email: <span>{profile.email}</span></li>
            </ul>
            <button>Editar Datos</button>
        </aside>
        <ImgCanvas/>
    </div>);
};

export default Profile;
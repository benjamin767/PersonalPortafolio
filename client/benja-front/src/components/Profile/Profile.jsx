import React, { useState } from "react";
import "./Profile.css";
import DataProjects from "../DataProjects/DataProjects";
import { useSelector } from "react-redux";
import ImgCanvas from "../ImgCanvas/ImgCanvas";
import Error404 from "../Error12345/Error";

const Profile = () => {
    const { profile } = useSelector(state => state);
    const [ isEditProfile, setIsEditProfile ] = useState( false );
    const [ profileData, setProfileData ] = useState({
        name: profile.name,
        email: profile.email
    });

    const handleChange = (event) => {
        event.preventDefault();

        setProfileData({ ...profileData, [event.target.name]: event.target.value })
    };

    const handleCancel = () => {
        setProfileData({
            name: profile.name,
            email: profile.email
        });
        setIsEditProfile(false)
    };

    const handleSubmit = ({ name, email }) => {
        
    }; 

    return (<> { profile.id ? 
    <>
        <ImgCanvas/>
        <div className="profile">
            <button className="edit-button">Editar Datos</button>
            <main className="projects">
                <h2>Proyectos:</h2>
                <div className="projects-data">
                    <DataProjects/>
                    <DataProjects/>
                    <DataProjects/>
                </div>
            </main>
            <aside className="profile-data">
                <h2>Datos proporcionados:</h2>
                { isEditProfile ? <>
                    <form>
                        <div>
                            <aside>Nombres: </aside>
                            <input
                                onChange={(event) => handleChange(event)}
                                value={profileData.name}
                                placeholder="Nombre"
                                name="name"
                            /> 
                        </div>
                        <div>
                            <aside>Email: </aside>
                            <input
                                onChange={(event) => handleChange(event)}
                                value={profileData.email}
                                type="email"
                                placeholder="email"
                                name="email"
                            />
                        </div>
                    </form> 
                    <div>
                        <button
                            className="edit-button"
                            onClick={() => setIsEditProfile(false)}
                        >
                            Actualizar
                        </button>
                        <button
                            className="cancel-button"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </>
                 :
                 <> 
                    <ul>
                        <li>Nombres: <span>{profile.name}</span> 
                        </li>
                        <li>Email: <span>{profile.email}</span> </li>
                    </ul> 
                
                    <button 
                        className="edit-button"
                        id="edit-button"
                        onClick={() => setIsEditProfile(true)}
                    >
                        Editar Datos
                    </button> 
                 </>}
            </aside>
        </div>
    </>
    : <> <ImgCanvas/> <Error404/> </>} </>);
};

export default Profile;
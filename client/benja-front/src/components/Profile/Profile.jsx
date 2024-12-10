import React, { useState } from "react";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import ImgCanvas from "../ImgCanvas/ImgCanvas";
import Error404 from "../Error12345/Error";
import { putUser } from "../../redux/actions";
import ReactModal from "react-modal";
import Loading from "../Loading/Loading";

const Profile = () => {
    const dispatch = useDispatch();
    const { profile, spinner } = useSelector(state => state);
    const [ isEditProfile, setIsEditProfile ] = useState( false );
    const [ profileData, setProfileData ] = useState({
        name: profile.name ? profile.name : "",
        email: profile.email ? profile.email : ""
    });
    const [ isOpen, setIsOpen ] = useState(false);

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

    const handleSubmit = async ({ name, email }) => {
        await dispatch(putUser(email, name, profile.id))
        .then(() => {
            setIsOpen(true);
        });
    }; 

    return (<> { profile.id ? 
    <>
        { spinner ? <Loading/> :
        <>
            <div className="profile">
                <ImgCanvas/>                
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
                        <div className="button-box">
                            <button
                                className="edit-button"
                                id="edit-button"
                                onClick={async () => await handleSubmit(profileData)}
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
                            onClick={() =>{
                                setIsEditProfile(true);
                                setProfileData({
                                    name: profile.name,
                                    email: profile.email
                                });
                            } }
                        >
                            Editar Datos
                        </button> 
                    </>}
                </aside>
            </div>
        </> }
    </> 
    : 
    <> <ImgCanvas/> <Error404/> </>}
    <ReactModal
        isOpen={isOpen}
        shouldCloseOnEsc={false}
        ariaHideApp={false}
        data={
            { background: "dark" }
        }
        style={{
            overlay: {
                position: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                zIndex: 4
            },  
            content: {
                position: 'absolute',
                color: "#aaa",
                top: '35%',
                left: '20%',
                right: '20%',
                bottom: '35%',
                border: '1px solid #444',
                background: '#111',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                textAlign: "center"
            }
        }}
    >
        <p>Los cambios realizados no se veran reflejados al instante...</p> 
        <button 
            className="ok"
            onClick={() => {
                setIsOpen(false);
                setIsEditProfile(false);
            }}
        >OK</button>
    </ReactModal> 
    </>);
};

export default Profile;
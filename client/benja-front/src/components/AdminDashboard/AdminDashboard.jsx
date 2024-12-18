import React, { useState } from "react";
import "./AdminDashboard.css"
import CANVA from "../ImgCanvas/ImgCanvas"
import CreatePrject from "../CreateProject/CreateProject"
import CreateTech from "../CreateTech/CreateTech"
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';
import Register from "../Register/Register";
import EditAboutMe from "./EditAboutMe/EditAboutMe";
import { logout } from "../../redux/actions";
import { useDispatch } from "react-redux";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState({
        createPro: true,
        createTech: true,
        createUser: true,
        editAbout: true,
        editPro: true,
        editTech: true,
    });
    const items = [
        {
            label: "Editar Datos",
            icon: "pi pi-user-edit",
            command: () => {
                setHidden({
                    createPro: true,
                    createTech: true,
                    createUser: true,
                    editAbout: false,
                    editPro: true,
                    editTech: true,
                })
            }
        },
        {
            label: "Crear un Usuario",
            icon: "pi pi-user-plus",
            command: () => {
                setHidden({
                    createPro: true,
                    createTech: true,
                    createUser: false,
                    editAbout: true,
                    editPro: true,
                    editTech: true,
                })
            }
        },
        {
            label: "Analisis de la pagina",
            icon: "pi pi-chart-bar",
            command: () => {
                setHidden({
                    createPro: true,
                    createTech: true,
                    createUser: true,
                    editAbout: false,
                    editPro: true,
                    editTech: true,
                })
            }
        },
        {
            key: '0',
            label: "Editores",
            icon: "pi pi-pencil",
            items: [
                {   
                    key: '0_1',
                    label: "Editar Proyectos",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            createUser: true,
                            editAbout: true,
                            editPro: false,
                            editTech: true,
                        })
                    }
                },
                {
                    key: '0_2',
                    label: "Editar Tecnologia",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            createUser: true,
                            editAbout: true,
                            editPro: true,
                            editTech: false,
                        })
                    }
                }
            ]
        },
        {
            key: '0',
            label: "Crear",
            icon: "pi pi-plus",
            items: [
                {
                    key: '0_1',
                    label: "Crear Proyectos",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            createUser: true,
                            editAbout: true,
                            editPro: false,
                            editTech: true,
                        })
                    }
                },
                {
                    key: '0_2',
                    label: "Crear Tecnologia",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: false,
                            createUser: true,
                            editAbout: true,
                            editPro: true,
                            editTech: true,
                        })
                    }
                }
            ]
        },
        {
            label: "Cerrar Sesion",
            icon: "pi pi-sign-out",
            command: () => {
                dispatch(logout())
            }
        },
    ];
    const footer = (<span className="text-400 text-xs">Pagina desarrollada por Benjamin Miño</span>);
    return (<>
        <div id="admin-dashboard">
            <main className="admin-dashboard_menu">
                <Card 
                    title={"Panel del Admin"}
                    footer={footer}
                    className="text-center flex flex-row align-content-center justify-content-center w-full surface-600 text-white-alpha-90"
                >
                    <PanelMenu model={items} className="md:w-15rem" />   
                </Card>
            </main>
            <aside className="admin-dashboard_info">
                <Card 
                    className="w-100rem surface-600 text-white-alpha-90"
                >
                    <CANVA title={"Herramientas de Administrador"}/>
                    {hidden.createPro ? null : <CreatePrject/>}
                    {hidden.createTech ? null : <CreateTech/>}
                    {hidden.createUser ? null : <Register/>}
                    {hidden.editAbout ? null : <EditAboutMe/>}
                    {hidden.editPro ? null : <CreatePrject/>}
                    {hidden.editTech ? null : <CreateTech/>}
                </Card>
            </aside>
        </div>
    </>)
};

export default AdminDashboard;
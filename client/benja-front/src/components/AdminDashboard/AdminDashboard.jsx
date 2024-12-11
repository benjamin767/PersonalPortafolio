import React, { useState } from "react";
import "./AdminDashboard.css"
import CANVA from "../ImgCanvas/ImgCanvas"
import CreatePrject from "../CreateProject/CreateProject"
import CreateTech from "../CreateTech/CreateTech"
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';

const AdminDashboard = () => {
    const [hidden, setHidden] = useState({
        createPro: true,
        createTech: true,
        editAbout: true,
        editPro: true,
        editTech: true,
    });
    const items = [
        {
            label: "Editar About Me",
            icon: "pi pi-user-edit",
            command: () => {
                setHidden({
                    createPro: true,
                    createTech: true,
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
                    editAbout: false,
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
                    editAbout: false,
                    editPro: true,
                    editTech: true,
                })
            }
        },
        {
            label: "Editores",
            icon: "pi pi-pencil",
            items: [
                {
                    label: "Editar Proyectos",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            editAbout: true,
                            editPro: false,
                            editTech: true,
                        })
                    }
                },
                {
                    label: "Editar Tecnologia",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            editAbout: true,
                            editPro: true,
                            editTech: false,
                        })
                    }
                }
            ]
        },
        {
            label: "Crear",
            icon: "pi pi-plus",
            items: [
                {
                    label: "Crear Proyectos",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: true,
                            editAbout: true,
                            editPro: false,
                            editTech: true,
                        })
                    }
                },
                {
                    label: "Crear Tecnologia",
                    command: () => {
                        setHidden({
                            createPro: true,
                            createTech: false,
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
                
            }
        },
    ];
    const footer = (<span className="text-400 text-xs">Pagina desarrollada por Benjamin Miño</span>);
    return (<>
        <div id="admin-dashboard">
            <main className="admin-dashboard_menu">
                <Card 
                    title="Menu Administrativo"
                    footer={footer}
                    className="text-center"
                >
                    <PanelMenu model={items} className="w-full md:w-20rem" />   
                </Card>
            </main>
            <aside className="admin-dashboard_info">
                <Card 
                    className="w-100rem"
                >
                    <CANVA title={"Herramientas de Administrador"}/>
                    {hidden.createPro ? null : <CreatePrject/>}
                    {hidden.createTech ? null : <CreateTech/>}
                    {hidden.editAbout ? null : <CreatePrject/>}
                    {hidden.editPro ? null : <CreatePrject/>}
                    {hidden.editTech ? null : <CreateTech/>}
                </Card>
            </aside>
        </div>
    </>)
};

export default AdminDashboard;
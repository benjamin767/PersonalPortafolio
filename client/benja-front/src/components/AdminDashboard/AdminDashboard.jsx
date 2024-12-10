import React, { useState } from "react";
import "./AdminDashboard.css"
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
                            editPro: false,
                            editTech: true,
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
            label: "Crear Proyecto",
            icon: "pi pi-desktop",
        },
    ];
    return (<>
        <div id="admin-dashboard">
            <main className="admin-dashboard_menu">
                <Card title="Menu">
                    <PanelMenu model={items} className="w-full md:w-20rem" />   
                </Card>
            </main>
            <aside>
                <Card>
                    {hidden.createPro ? null : <CreatePrject />}
                    {hidden.createTech ? null : <CreateTech />}
                    {hidden.editAbout ? null : <CreatePrject/>}
                    {hidden.editPro ? null : <CreatePrject/>}
                    {hidden.editTech ? null : <CreatePrject/>}
                </Card>
            </aside>
        </div>
    </>)
};

export default AdminDashboard;
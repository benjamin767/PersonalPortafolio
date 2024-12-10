import React from "react";
import "./AdminDashboard.css"
import { PanelMenu } from 'primereact/panelmenu';
import { Card } from 'primereact/card';

const AdminDashboard = () => {
    const itemRenderer = (item, options) => (
        <a className="flex align-items-center px-3 py-2 cursor-pointer" onClick={options.onClick}>
            <span className={`${item.icon} text-primary`} />
            <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: "Files",
            icon: "pi pi-file",
            items: [
                {
                    label: 'Phone',
                    icon: 'pi pi-mobile'
                },
                {
                    label: 'Desktop',
                    icon: 'pi pi-desktop'
                },
                {
                    label: 'Tablet',
                    icon: 'pi pi-tablet'
                }
            ]
        },
        {
            label: "Cloud",
            icon: "pi pi-cloud",
            command: () => {
                
            }
        },
        {
            label: "Desktop",
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
            <aside></aside>
        </div>
    </>)
};

export default AdminDashboard;
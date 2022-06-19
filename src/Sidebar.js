import { useAuth } from "./context/AuthContext";
import {auth, functions} from './firebase';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { render } from "react-dom";
import Loading from "./loading";
import MenuComponent from "./MenuComponent";

let menuItemsHtml = null;
function Sidebar() {
  const [loading,setLoading] = useState(true);
  
  const getMenuItem = async()=>{
    try{
        setLoading(true);
        if(menuItemsHtml != null)
            return;
        else{
            menuItemsHtml =[];
            let tokenData = await auth.currentUser.getIdToken();
            await axios.post(
            'http://localhost:5001/shalom-103df/us-central1/app/getAvailableModules',
            { example: 'data' },
            { headers: { 
                'Content-Type': 'application/json',
                'Authorization':  'Bearer '+tokenData
            } }
            ).then(function(resp){
                console.log(resp.data);
                console.log(resp.data.Objects);
                resp.data.Objects.forEach(element => {
                    console.log(element._fieldsProto.ObjectName.stringValue);
                    if(element._fieldsProto.Read.booleanValue){
                        menuItemsHtml.push(String(element._fieldsProto.ObjectName.stringValue));
                    }
                });
                console.log(menuItemsHtml);
                setLoading(false);
            })
            .catch(function(err){
                console.log(err);
                setLoading(false);
            });
        }
      } catch(err){
          console.log(err);
      }
    
    }

    const { logout, user } = useAuth();
    useEffect(() => {
        getMenuItem();
    }, []);
    console.log(user);
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error.message);
      }
    };

    if(loading){
        return <Loading />;
    }
    else{
        return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <a className="nav-link collapsed" href="index.html">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-menu-button-wide"></i><span>Gestor de Pedidos</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
                    {menuItemsHtml && <MenuComponent Objects={menuItemsHtml}/>}
                </ul>
            </li>

            <li className="nav-heading">Pages</li>

                <li className="nav-item">
                    <a className="nav-link collapsed" href="?" onClick={handleLogout}>
                        <i className="bi bi-person"></i>
                        <span>Cerrar Sesión</span>
                    </a>
                </li>

            </ul>

        </aside>
    )
    }

  
}
export default Sidebar;




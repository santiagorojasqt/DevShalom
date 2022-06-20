import { useAuth } from "./context/AuthContext";
import {auth, functions} from './firebase';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
        console.log('The local storage');
        console.log(window.localStorage.getItem('MenuItem'));
        if(window.localStorage.getItem('MenuItem')){
            menuItemsHtml = JSON.parse(window.localStorage.getItem("MenuItem"));
            setLoading(false);
            return;
        }
        if(menuItemsHtml && menuItemsHtml.size()>0){
            setLoading(false);
            return;
        }
        else{
            menuItemsHtml =[];
            let tokenData = await auth.currentUser.getIdToken();
            await axios.post(
            'https://us-central1-shalom-103df.cloudfunctions.net/app/getAvailableModules',
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
                        menuItemsHtml.push({
                            "value":element._fieldsProto.ObjectName.stringValue,
                            "url":element._fieldsProto.Url.stringValue
                        });
                    }
                });
                window.localStorage.setItem("MenuItem", JSON.stringify(menuItemsHtml));
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
        window.localStorage.clear();
      } catch (error) {
        console.error(error.message);
      }
    };

    if(loading){
        return <Loading  type="String" color="#000000" />;
    }
    else{
        return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">

            <li className="nav-item">
                <Link to="/Dashboard" className="nav-link collapsed" >
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </Link>
            </li>

            <li className="nav-item">
                <a className="nav-link " data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i className="bi bi-menu-button-wide"></i><span>Gestor de Pedidos</span><i className="bi bi-chevron-down ms-auto"></i>
                </a>
                {menuItemsHtml && <MenuComponent listValue={menuItemsHtml}/>}
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




import { useAuth } from "./context/AuthContext";
import {auth} from './firebase';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "./loading";
import MenuComponent from "./MenuComponent";

let menuItemsHtml = null;
let gotten = false;
function Sidebar() {
  const [sideBarloading,setSideBarLoading] = useState(false);
  const { logout, user } = useAuth();
  if(!sideBarloading&& !menuItemsHtml && user) setSideBarLoading(true);
  useEffect(() => {
    console.log('fired');
        if(!gotten && user){
            gotten =true;
            console.log(sideBarloading);
            getMenuItem();
        }
    }, [sideBarloading]);
  if (!user) return (<div></div>);
  const getMenuItem = async()=>{
    console.log('Entered');
    try{
        
        console.log('The local storage');
        console.log(window.localStorage.getItem('MenuItem'));
        if(window.localStorage.getItem('MenuItem')){
            menuItemsHtml = JSON.parse(window.localStorage.getItem("MenuItem"));
            console.log(menuItemsHtml);
            console.log(sideBarloading);
            setSideBarLoading(false);
        }
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
                console.log(resp);
                console.log(resp.data);
                console.log(resp.data.Objects);
                for(const element in resp.data.Objects){
                    const elementData = resp.data.Objects[element];
                    console.log(elementData);
                    if(elementData._fieldsProto.Read.booleanValue){
                        menuItemsHtml.push({
                            "value":elementData._fieldsProto.ObjectName.stringValue,
                            "url":elementData._fieldsProto.Url.stringValue
                        });
                    }
                }
                window.localStorage.setItem("MenuItem", JSON.stringify(menuItemsHtml));
                setSideBarLoading(false);
            })
            .catch(function(err){
                console.log(err);
                setSideBarLoading(false);
            });
        }
      } catch(err){
          console.log(err);
          setSideBarLoading(false);
      }
    
    }
    
    const handleLogout = async () => {
      try {
        await logout();
        window.localStorage.clear();
      } catch (error) {
        console.error(error.message);
      }
    };
    
    if(sideBarloading){
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




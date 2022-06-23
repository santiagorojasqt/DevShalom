import './public/css/style.css';
import './public/vendor/bootstrap/css/bootstrap.min.css';
import './public/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/vendor/boxicons/css/boxicons.min.css';
import './public/vendor/quill/quill.snow.css';
import './public/vendor/quill/quill.bubble.css';
import './public/vendor/remixicon/remixicon.css';
import './public/vendor/simple-datatables/style.css';
import './public/css/style.css';
import ReactTooltip from 'react-tooltip';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import {auth, functions} from './firebase';
import Loading from "./loading";
import { useNavigate } from 'react-router-dom'



let allUsers = null
function User() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllUsers = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllUsers',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allUsers = resp.data;
        setLoading(false);
    })
    .catch(function(err){
        allUsers=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newUser=(item)=>{
    console.log(item.id);
    navigate('/User/Create',{state:item},{ replace: true })
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Usuarios</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">Pedidos</li>
                  <li class="breadcrumb-item active">Usuario</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newUser}>Crear Usuario</button>
                      </div>
                      <h5 class="card-title">Todos Los Usuarios</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Email</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allUsers && allUsers.map(item => {
                            return (
                              <tr key={item}>
                                <td scope="row">{ item.data['Nombre'] && item.data ['Nombre'] }</td>
                                <td scope="row">{ item.data['Telefono'] && item.data ['Telefono'] }</td>
                                <td scope="row">{ item.data['Celular'] && item.data ['Celular'] }</td>
                                <td scope="row">{ item.data['Email'] && item.data ['Email'] }</td>
                                <td scope="row">{ item.data['Sede'] && item.data ['Sede'] }</td>
                                <td scope="row">
                                <a className="nav-link nav-icon"
                                    onMouseEnter={() => showTooltip(true)}
                                    onMouseLeave={() => {
                                      showTooltip(false);
                                      setTimeout(() => showTooltip(true), 50);
                                    }} data-tip="Da click para ver mas opciones" href="#" data-bs-toggle="dropdown">
                                  {tooltip && <ReactTooltip effect="solid" />}
                                  <i className="bi bi-caret-down-fill"></i>
                                </a>
                                
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                      Acciones
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider"/>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" onClick={() => newUser(item)}>
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Modificar</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="ri ri-lock-unlock-fill text-success"></i>
                                        <span>Restaurar Clave</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-check-circle text-success"></i>
                                        <span>Enviar Paz y Salvo</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="ri ri-money-dollar-circle-line text-success"></i>
                                        <span>Ver Presupuesto</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="ri ri-mail-send-line text-success"></i>
                                        <span>Enviar Presupuesto</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="ri ri-guide-line text-success"></i>
                                        <span>Generar Guia</span>
                                      </a>
                                    </li>
                                    
                                  </ul>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
      </div>
    )
  }
  
}
export default User;
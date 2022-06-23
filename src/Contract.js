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
import Sidebar from './Sidebar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import {auth} from './firebase';
import Loading from "./loading";
import { useNavigate } from 'react-router-dom'



let allContracts = null
function Contract() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllContracts = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllContracts',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allContracts = resp.data;
        console.log(allContracts[0].data);
        setLoading(false);
    })
    .catch(function(err){
        allContracts=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newContract =(item)=>{
    console.log(item.id);
    navigate('/Contract/Create',{state:item},{ replace: true })
  }

  useEffect(() => {
    getAllContracts();
  }, []);

  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="Contract">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Contratos</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item"> G Pedidos</li>
                  <li class="breadcrumb-item active">Contratos</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newContract}>Crear Contrato</button>
                      </div>
                      <h5 class="card-title">Todos Los Contratos</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">ID Contrato</th>
                            <th scope="col">Referencia</th>
                            <th scope="col">Entidad/Cliente</th>
                            <th scope="col">Direccion</th>
                            <th scope="col">Telefono</th>
                            <th scope="col">Fecha Inicio</th>
                            <th scope="col">Fecha Fin</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col">Email Notificaciones Estado Pedidos</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allContracts && allContracts.map(item => {
                            return ( 
                              <tr key={item}>
                                <td scope="row">{ item.data['ID Contrato'] && item.data['ID Contrato'] }</td>
                                <td scope="row">{ item.data['Referencia'] && item.data['Referencia'] }</td>
                                <td scope="row">{ item.data['Entidad/Cliente'] && item.data['Entidad/Cliente'] }</td>
                                <td scope="row">{ item.data['Direccion'] && item.data['Direccion'] }</td>
                                <td scope="row">{ item.data['Telefono'] && item.data['Telefono'] }</td>
                                <td scope="row">{ item.data['Fecha Inicio'] && item.data['Fecha Inicio'] }</td>
                                <td scope="row">{ item.data['Fecha Fin'] && item.data['Fecha Fin'] }</td>
                                <td scope="row">{ item.data['Observaciones'] && item.data['Observaciones'] }</td>
                                <td scope="row">{ item.data['Email Notificacion de Estado de Pedidos'] && item.data['Email Notificacion de Estado de Pedidos'] }</td>
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
                                      <a className="dropdown-item d-flex align-items-center" onClick={() => newContract(item) }>
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Modificar</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="ri ri-arrow-down-circle-fill text-success"></i>
                                        <span>Descargar</span>
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
export default Contract;
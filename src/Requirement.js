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
import { useAuth } from "./context/AuthContext";
import Sidebar from './Sidebar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import Header from './Header';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import {auth, functions} from './firebase';
import Loading from "./loading";
import { useNavigate } from 'react-router-dom'


let allRequirements = null

function Requirement() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllRequirements = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllRequirements',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allRequirements = resp.data;
        setLoading(false);
    })
    .catch(function(err){
        allRequirements=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newRequirement = async()=>{
    navigate('/Requirement/Create')
  }
  useEffect(() => {
    getAllRequirements();
  }, []);
  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Requerimientos</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">G Pedidos</li>
                  <li class="breadcrumb-item active">Requerimientos</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newRequirement}>Crear Requerimiento</button>
                      </div>
                      <h5 class="card-title">Todos Los Requerimientos</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">Prioridad</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Tipo de Entrega</th>
                            <th scope="col">Nº Pedido</th>
                            <th scope="col">Remision Asociada</th>
                            <th scope="col">Entrega</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Zona</th>
                            <th scope="col">Centro de Costo</th>
                            <th scope="col">Creacion Aprobacion Despacho Entrega</th>
                            <th scope="col">Valor presupuestado</th>
                            <th scope="col">Valor Ejecutado</th>
                            <th scope="col">Gestion</th>
                            <th scope="col">Impresion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allRequirements && allRequirements.map(item => {
                            return (
                              <tr key={item._ref._path.segments[1]}>
                                <td scope="row">{ item._fieldsProto['Prioridad'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Estado'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Tipo de Entrega'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Nº Pedido'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Remision Asociada'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Entrega'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Tipo'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Zona'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Centro de Costo'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Creacion Aprobacion Despacho Entrega'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Valor Presupuestado'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Valor Ejecutado'].stringValue }</td>
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
                                      Gestion
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider"/>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Consultar</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="ri ri-lock-unlock-fill text-success"></i>
                                        <span>Duplicar</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-check-circle text-success"></i>
                                        <span>Generar Faltantes</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="ri ri-money-dollar-circle-line text-success"></i>
                                        <span>Ver Trazabilidad</span>
                                      </a>
                                    </li>
                                  </ul>
                                </td>
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
                                      Impresion
                                    </li>
                                    <li>
                                      <hr className="dropdown-divider"/>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Alistamiento</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="ri ri-lock-unlock-fill text-success"></i>
                                        <span>Solo Aprobado</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-check-circle text-success"></i>
                                        <span>Con Precios</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="ri ri-money-dollar-circle-line text-success"></i>
                                        <span>Acta Smart</span>
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
export default Requirement;
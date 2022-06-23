import './public/css/style.css';
import './public/vendor/bootstrap/css/bootstrap.min.css';
import './public/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/vendor/boxicons/css/boxicons.min.css';
import './public/vendor/quill/quill.snow.css';
import './public/vendor/quill/quill.bubble.css';
import './public/vendor/remixicon/remixicon.css';
import './public/vendor/simple-datatables/style.css';
import './public/css/style.css';
import ReactTooltip from 'react-tooltip'
import Sidebar from './Sidebar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import {auth, functions} from './firebase';
import Loading from "./loading";
import { Link,useNavigate } from 'react-router-dom'



let allBranches = null
function Branch() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllBranches = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllBranches',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allBranches = resp.data;
        console.log(allBranches[0].data);
        setLoading(false);
    })
    .catch(function(err){
        allBranches=[];
        console.log(err);
        setLoading(false);
    });
  }

  const gotoCreate=(item)=>{
    console.log(item.id);
    navigate('/Branch/Create',{state:item},{ replace: true });
  }

  const newBranch= ()=>{
    console.log();
    navigate('/Branch/Create');
  }

  useEffect(() => {
    getAllBranches();
  }, []);

  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="Contract">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Sedes</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">CC</li>
                  <li class="breadcrumb-item active">Sede</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newBranch}>Crear sede</button>
                      </div>
                      <h5 class="card-title">Todas Las Sedes</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">Direccion</th>
                            <th scope="col">Frecuencia de Envio</th>
                            <th scope="col">Municipio</th>
                            <th scope="col">Nombre CC</th>
                            <th scope="col">Observaciones</th>
                            <th scope="col">Presupuesto Pedido</th>
                            <th scope="col">Presupuesto Total</th>
                            <th scope="col">Transportadora Primaria</th>
                            <th scope="col">Zona</th>
                            <th scope="col">Acciones</th>
                           </tr>
                        </thead>
                        <tbody>
                          {allBranches && allBranches.map(item => {
                            return (
                              <tr key={item}>
                                <td scope="row">{ item.data['Direccion'] && item.data['Direccion'] }</td>
                                <td scope="row">{ item.data['Frecuencia de Envio'] && item.data['Frecuencia de Envio'] }</td>
                                <td scope="row">{ item.data['Municipio'] && item.data['Municipio'] }</td>
                                <td scope="row">{ item.data['Nombre CC'] && item.data['Nombre CC'] }</td>
                                <td scope="row">{ item.data['Observaciones'] && item.data['Observaciones'] }</td>
                                <td scope="row">{ item.data['Presupuesto Pedido'] && item.data['Presupuesto Pedido'] }</td>
                                <td scope="row">{ item.data['Presupuesto Total'] && item.data['Presupuesto Total'] }</td>
                                <td scope="row">{ item.data['Transportadora Primaria'] && item.data['Transportadora Primaria'] }</td>
                                <td scope="row">{ item.data['Zona'] && item.data['Zona'] }</td>
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
                                      <a className="dropdown-item d-flex align-items-center" onClick={() => gotoCreate(item)}>
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
export default Branch;
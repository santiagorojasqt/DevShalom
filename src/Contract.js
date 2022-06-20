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

let allContracts = null
function Contract() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllContracts = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'https://us-central1-shalom-103df.cloudfunctions.net/app/getAllContracts',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allContracts = resp.data;
        setLoading(false);
    })
    .catch(function(err){
        allContracts=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newContract = async()=>{
    navigate('/Contract/Create')
  }
  useEffect(() => {
    getAllContracts();
  }, []);
  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
        <Header/>
        <Sidebar />
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
                              <tr key={item._ref._path.segments[1]}>
                                <td scope="row">{ item._fieldsProto['ID Contrato'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Referencia'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Entidad/Cliente'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Direccion'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Telefono'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Fecha Inicio'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Fecha Fin'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Observaciones'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Email Notificaciones Estado Pedidos'].stringValue }</td>
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
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
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
        <Footer/>
      </div>
    )
  }
  
}
export default Contract;
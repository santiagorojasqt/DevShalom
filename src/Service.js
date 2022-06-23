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
import Footer from './Footer';
import {auth, functions} from './firebase';
import Loading from "./loading";
import { useNavigate } from 'react-router-dom'




let allServices = null

function Service() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllServices = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllServices',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allServices = resp.data;
        console.log(allServices[0].data);
        setLoading(false);
    })
    .catch(function(err){
        allServices=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newService =(item)=>{
    console.log(item.id);
    navigate('/Service/Create',{state:item},{ replace: true })
  }

  const createService =()=>{
    navigate('/Service/Create')
  }
  useEffect(() => {
    getAllServices();
  }, []);
  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Servicios</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">G Pedidos</li>
                  <li class="breadcrumb-item active">Servicios</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={createService}>Crear Servicio</button>
                      </div>
                      <h5 class="card-title">Todos Los Servicios</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Codigo</th>
                            <th scope="col">Codigo 2</th>
                            <th scope="col">Linea</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Unidad de Medida</th>
                            <th scope="col">Detalle</th>
                            <th scope="col">Precio</th>
                            <th scope="col">IVA</th>
                            <th scope="col">Valor con IVA</th>
                            <th scope="col">Cantidad Mensual</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allServices && allServices.map(item => {
                            return (
                              <tr key={item}>
                                <td scope="row">{ item.data['Codigo'] && item.data['Codigo'] }</td>
                                <td scope="row">{ item.data['Codigo'] && item.data['Codigo'] }</td>
                                <td scope="row">{ item.data['Codigo 2'] && item.data['Codigo 2'] }</td>
                                <td scope="row">{ item.data['Linea'] && item.data['Linea'] }</td>
                                <td scope="row">{ item.data['Descripcion'] && item.data['Descripcion'] }</td>
                                <td scope="row">{ item.data['Unidad de Medida'] && item.data['Unidad de Medida'] }</td>
                                <td scope="row">{ item.data['Detalle'] && item.data['Detalle'] }</td>
                                <td scope="row">{ item.data['Precio (En Pesos)'] && item.data['Precio (En Pesos)'] }</td>
                                <td scope="row">{ item.data['Iva (En Pesos)'] && item.data['Iva (En Pesos)'] }</td>
                                <td scope="row">{ item.data['Valor con IVA'] && item.data['Valor con IVA'] }</td>
                                <td scope="row">{ item.data['Cantidad Mensual Contrato'] && item.data['Cantidad Mensual Contrato'] }</td>
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
                                      <a className="dropdown-item d-flex align-items-center" onClick={() => newService(item)}>
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Modificar</span>
                                      </a>
                                    </li>
                                    <li className="dropdown-item d-flex align-items-center">
                                      <a className="dropdown-item d-flex align-items-center"  href="users-profile.html">
                                        <i className="ri ri-lock-unlock-fill text-success"></i>
                                        <span>Ver Consumo</span>
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
export default Service;
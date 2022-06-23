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
import { render } from "react-dom";
import { Helmet } from 'react-helmet';
import {auth, functions} from './firebase';
import Loading from "./loading";
import { useNavigate } from 'react-router-dom'



let allDeliveries = null
function Delivery() {
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllDeliveries = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getAllDeliveries',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allDeliveries = resp.data;
        setLoading(false);
    })
    .catch(function(err){
        allDeliveries=[];
        console.log(err);
        setLoading(false);
    });
  }

  const newDelivery =(item)=>{
    console.log(item.id);
    navigate('/Delivery/Create',{state:item},{ replace: true })
  }


  useEffect(() => {
    getAllDeliveries();
  }, []);

  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" class="main">
            <div class="pagetitle">
              <h1>Entregas</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">G Pedidos</li>
                  <li class="breadcrumb-item active">Entrega</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newDelivery}>Crear Entrega</button>
                      </div>
                      <h5 class="card-title">Todas Las Entregas</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">ID Entrega</th>
                            <th scope="col">ID Contrato</th>
                            <th scope="col">Codigo Entrega</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allDeliveries && allDeliveries.map(item => {
                            return (
                              <tr key={item}>
                                <td scope="row">{ item.data['Nombre'] && item.data['Nombre'] }</td>
                                <td scope="row">{ item.data['Codigo del Contrato'] && item.data['Codigo del Contrato'] }</td>
                                <td scope="row">{ item.data['ID Entrega'] && item.data['ID Entrega'] }</td>
                                <td scope="row">{ item.data['Descripcion de la Entrega'] && item.data['Descripcion de la Entrega'] }</td>
                                <td scope="row">{ item.data['Estado Entrega'] && item.data['Estado Entrega'] }</td>
                                <td scope="row">
                                <a className="nav-link nav-icon"
                                    onMouseEnter={() => showTooltip(true)}
                                    onMouseLeave={() => {
                                      showTooltip(false);
                                      setTimeout(() => showTooltip(true), 50);
                                    }} data-tip="Da click para ver mas opciones" data-bs-toggle="dropdown">
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
                                      <a className="dropdown-item d-flex align-items-center" onClick={() => newDelivery(item)}>
                                        <i className="bi bi-pencil-fill text-dark"></i>
                                        <span>Modificar</span>
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
export default Delivery;
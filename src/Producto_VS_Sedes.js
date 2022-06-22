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
    'https://us-central1-shalom-103df.cloudfunctions.net/app/getAllBranches',
    { example: 'data' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        allBranches = resp.data;
        setLoading(false);
    })
    .catch(function(err){
        allBranches=[];
        console.log(err);
        setLoading(false);
    });
  }

  const gotoCreate=(item)=>{
    navigate('/Branch/Create',{state:item},{ replace: true });
  }

  const newBranch = async()=>{
    navigate('/Branch/Create')
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
              <h1>Informes</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">Informes</li>
                  <li class="breadcrumb-item active">Productos_VS_Sedes</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newBranch}>Imprimir</button>
                      </div>
                      <div className='card float-right'>
                        <button className='btn btn-primary' onClick={newBranch}>Filtro Sedes</button>
                      </div>
                      <h5 class="card-title">Informes Producto-Sedes</h5>
                      <table className='table thead-light'>
                        <thead>
                          <tr>
                            <th scope="col">Linea</th>
                            <th scope="col">Codigo Producto</th>
                            <th scope="col">Codigo 2</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Detalle Producto</th>
                            <th scope="col">Precio unitario</th>
                            <th scope="col">columna de sedes</th> 
                            <th scope="col">Cantidad Total</th>
                            <th scope="col">Precio Total</th>
                            <th scope="col">Total Acumulado</th>
                      
                          </tr>
                        </thead>
                        <tbody>
                          {allBranches && allBranches.map(item => {
                            return (
                              <tr key={item._ref._path.segments[1]}>
                                <td scope="row">{ item._fieldsProto['Direccion']&& item._fieldsProto['Direccion'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Frecuencia de Envio']&& item._fieldsProto['Frecuencia de Envio'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Municipio']&& item._fieldsProto['Municipio'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Nombre CC']&& item._fieldsProto['Nombre CC'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Observaciones']&& item._fieldsProto['Observaciones'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Presupuesto Pedido']&& item._fieldsProto['Presupuesto Pedido'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Presupuesto Total']&& item._fieldsProto['Presupuesto Total'].integerValue }</td>
                                <td scope="row">{ item._fieldsProto['Transportadora Primaria']&& item._fieldsProto['Transportadora Primaria'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Zona']&& item._fieldsProto['Zona'].stringValue }</td>
                                <td scope="row">{ item._fieldsProto['Zona']&& item._fieldsProto['Zona'].stringValue }</td>
                               
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
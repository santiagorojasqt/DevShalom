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
function BranchCreate(BranchInfo) {
  let title;
  if(!BranchInfo){
    title = 'Crear Sede';
    BranchInfo = {};
  }
  else{
    title = 'Actualizar Sede';
  }
  const [loading,setLoading] = useState(false);
  const [tooltip, showTooltip] = useState(true);
  const getFieldsForObject = async()=>{
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
    { "objectReference" : 'Objects/gC6aLoXOhzxj7O9PU8i8',"profileReference":'Profile/Oykf5oxovVpt7tKvBJVd' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp.data);
        setLoading(false);
    })
    .catch(function(err){
        console.log(err);
        setLoading(false);
    });
  }
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
              <h1>Sedes</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li class="breadcrumb-item">Pedidos</li>
                  <li class="breadcrumb-item active">Sede</li>
                </ol>
              </nav>
            </div>

            <section class="section">
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{title}</h5>
                      
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
export default BranchCreate;
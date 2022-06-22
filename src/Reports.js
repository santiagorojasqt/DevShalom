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
import cardimg from './public/img/informe-de-datos.png';
import cardimg2 from './public/img/tablero.png';
import cardimg3 from './public/img/analitica.png';
import cardimg4 from './public/img/presentacion.png';
import cardimg5 from './public/img/presentacionn.png';
import cardimg6 from './public/img/informe-de-datoss.png';
import cardimg7 from './public/img/formacion.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { render } from "react-dom";
import Header from './Header';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import { auth, functions } from './firebase';
import Loading from "./loading";
import { Link, useNavigate } from 'react-router-dom'




let allBranches = null



function Branch() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [tooltip, showTooltip] = useState(true);
  const getAllBranches = async () => {
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
      'https://us-central1-shalom-103df.cloudfunctions.net/app/getAllBranches',
      { example: 'data' },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + tokenData
        }
      }
    ).then(function (resp) {
      console.log(resp.data);
      allBranches = resp.data;
      setLoading(false);
    })
      .catch(function (err) {
        allBranches = [];
        console.log(err);
        setLoading(false);
      });
  }

  const gotoCreate = (item) => {
    navigate('/Branch/Create', { state: item }, { replace: true });
  }

  const newBranch = async () => {
    navigate('/Branch/Create')
  }
  useEffect(() => {
    getAllBranches();
  }, []);
  if (loading) {
    return <Loading type="String" color="#000000" />;
  }
  else {
    return (
      <div className="Contract">
        <main id="main" class="main">
          <div class="pagetitle">
            <h1>Reportes</h1>
            <nav>
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item">Reportes</li>

              </ol>
            </nav>
          </div>

          <section class="section">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">

                    <div class="row">

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Productos VS Sedes</h5>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg2} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Productos VS Entregas</h5>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg3} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Master por Sedes</h5>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg4} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Master por Zonas</h5>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div class="row">

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg5} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Presupuesto Sedes</h5>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg6} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Presupuesto Zonas</h5>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div class="card" style={{ width: '250px', alignItems: 'center' }}>
                          <img src={cardimg7} style={{ width: '190px', height: '190px', marginTop: 15 }} class="card-img-top" alt="..." />
                          <div class="card-body">
                            <h5 class="card-text">Presupuestos Linea</h5>
                          </div>
                        </div>
                      </div>

  

                    </div>


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
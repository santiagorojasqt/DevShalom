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
let formData = {};
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
    /*if(window.localStorage.getItem('BranchFormData')){
        formData = JSON.parse(window.localStorage.getItem("BranchFormData"));
        setLoading(false);
        return;
    }*/
    let tokenData = await auth.currentUser.getIdToken();
    setLoading(true);
    await axios.post(
    'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
    { "objectReference" : 'Objects/gC6aLoXOhzxj7O9PU8i8',"profileReference":'Profile Object Permissions/pB6eSuUiN2PDvunlRv1w' },
    { headers: { 
        'Content-Type': 'application/json',
        'Authorization':  'Bearer '+tokenData
    } }
    ).then(function(resp){
        console.log(resp);
        for(const element in resp.data){
          const dataElement = resp.data[element];
          console.log(dataElement);
          console.log(dataElement._fieldsProto);
          if(formData[dataElement._fieldsProto.Type.stringValue]){
            formData[dataElement._fieldsProto.Type.stringValue].push({
                Name:dataElement._fieldsProto.Name.stringValue,
                Type:dataElement._fieldsProto.Type.stringValue,
                Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
            });
          }
          else{
            formData[dataElement._fieldsProto.Type.stringValue] = [{
              Name:dataElement._fieldsProto.Name.stringValue,
              Type:dataElement._fieldsProto.Type.stringValue,
              Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
              Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
              RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
            }];
          }
        }
        console.log(formData);
        setLoading(false);
    })
    .catch(function(err){
        console.log(err);
        setLoading(false);
    });
  }

  const handleChange = async(e) => {
    
  }
  useEffect(() => {
    getFieldsForObject();
  }, []);
  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div classNameName="App">
        <Header/>
        <Sidebar />
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Sedes</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">Pedidos</li>
                  <li className="breadcrumb-item active">Sede</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <form>
                        {formData['Text'] && formData['Text'].map(item => {
                              return (
                                <div classNameName="row mb-3">
                                <label for="inputText" className="col-sm-2 col-form-label">{item.Name}</label>
                                  <div className="col-sm-10">
                                    <input aria-current={item} name={item.Name} id={item.Name+item.Type} type="text" onChange={handleChange()} className="form-control"/>
                                  </div>
                                </div>
                              );
                          })}
                          {formData['ComboBox']>0 && formData['ComboBox'].map(item => {
                              return (
                                <div classNameName="row mb-3">
                                <label class="col-sm-2 col-form-label">{item.Name}</label>
                                <div class="col-sm-10">
                                  <select aria-current={item} class="form-select" onChange={handleChange()} aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                                </div>
                                </div>
                              );
                          })}
                          {formData['Number'] && formData['Number'].map(item => {
                              return (
                                <div classNameName="row mb-3">
                                  { }
                                </div>
                              );
                          })}
                          {formData['Date']>0 && formData['Date'].map(item => {
                              return (
                                <div classNameName="row mb-3">
                                  { }
                                </div>
                              );
                          })}

                          {formData['Media']>0 && formData['Media'].map(item => {
                              return (
                                <div classNameName="row mb-3">
                                  { }
                                </div>
                              );
                          })}
                          
                      </form>
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
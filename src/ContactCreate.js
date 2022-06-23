 import './public/css/style.css';
import './public/vendor/bootstrap/css/bootstrap.min.css';
import './public/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/vendor/boxicons/css/boxicons.min.css';
import './public/vendor/quill/quill.snow.css';
import './public/vendor/quill/quill.bubble.css';
import './public/vendor/remixicon/remixicon.css';
import './public/vendor/simple-datatables/style.css';
import './public/css/style.css';
import Sidebar from './Sidebar';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {auth} from './firebase';
import Loading from "./loading";
import Form from './Form';
import { useNavigate,useLocation } from 'react-router-dom'

let dataRetrieved = false;
let title;
let formData;
let location;
function ContactCreate() {
  const [loading,setLoading] = useState(false);
  location = useLocation()
  const getFieldsForObject = async()=>{
    
    if(window.localStorage.getItem('ContactFormData')){
      
      setLoading(false);
      formData = JSON.parse(window.localStorage.getItem("ContactFormData"));
      console.log(formData);
      dataRetrieved = true;
      setLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
      { "objectReference" : 'Objects/OzjyLVSfBKZFcVbsLTfO',"profileReference":'Profile Object Permissions/9DsnfpuikqoYaP42HKBf' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      ).then(function(resp){
          formData = {};
          console.log(resp);
          for(const element in resp.data){
            const dataElement = resp.data[element];
            console.log(dataElement);
            if(dataElement== null) continue;
            console.log(dataElement._fieldsProto);
            if(dataElement._fieldsProto.Type.stringValue == 'Combobox'){
              dataElement._fieldsProto.Type.stringValue = 'ComboBox';
            }
            
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
          window.localStorage.setItem("ContactFormData", JSON.stringify(formData));
          console.log(formData);
          dataRetrieved = true;
          console.log(formData)
          setLoading(false);
      })
      .catch(function(err){
          console.log(err);
          dataRetrieved = true;
          setLoading(false);
      });
    }
  }
  

  const handleChange = async(e) => {
    
  }
  const handleSave = async(e) => {
    
  }
  
  useEffect(()=>{
    if(!dataRetrieved){
      dataRetrieved = true;
      getFieldsForObject();
      console.log('fired once');
    }
  },[loading]);

  if(loading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Contactos</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">CC</li>
                  <li className="breadcrumb-item active">Contactos</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      { formData  &&  <Form values={location.state &&  location.state!== typeof undefined?location.state:{}} object='Contactos' goTo='/Contact' formData={formData} />}
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
export default ContactCreate;
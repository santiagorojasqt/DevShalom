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
import Header from './Header';
import Footer from './Footer';
import {auth} from './firebase';
import Loading from "./loading";
import Form from './Form';
import { useLocation } from 'react-router-dom'

let dataRetrieved = false;
let title;
let formData;
let location;
function ContractCreate() {
  const [loading,setLoading] = useState(false);
  location = useLocation()
  if(!loading&& !formData) setLoading(true);
  const getFieldsForObject = async()=>{
    
    if(window.localStorage.getItem('ContractFormData')){
      
      setLoading(false);
      formData = JSON.parse(window.localStorage.getItem("ContractFormData"));
      console.log(formData);
      dataRetrieved = true;
      setLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      await axios.post(
      'https://us-central1-shalom-103df.cloudfunctions.net/app/getFieldsForObject',
      { "objectReference" : 'Objects/BIbeb7Pqiera9YhdaCAs',"profileReference":'Profile Object Permissions/GcBdKKnHZx1i2vivFToS' },
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
          window.localStorage.setItem("ContractFormData", JSON.stringify(formData));
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
              <h1>Contratos</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">Pedidos</li>
                  <li className="breadcrumb-item active">Contratos</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      { formData  && formData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state._fieldsProto:{} } goTo='/Contract' formData={formData} />}
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
export default ContractCreate;
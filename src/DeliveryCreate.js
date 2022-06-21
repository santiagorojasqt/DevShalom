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
import { useNavigate,useLocation } from 'react-router-dom'

let deliveryDataRetrieved = false;
let title;
let deliveryFormData;
let location;
function DeliveryCreate() {
  console.log('mounted');
  console.log('mounted');
  
  const [deliveryLoading,setdeliveryLoading] = useState(false);
  console.log('mounted');
  location = useLocation()
  console.log('mounted');
  const navigate2 = useNavigate()
  console.log('mounted');
  
  const getFieldsForObject = async()=>{
    setdeliveryLoading(true);
    if(window.localStorage.getItem('DeliveryFormData')){
      deliveryFormData = JSON.parse(window.localStorage.getItem("DeliveryFormData"));
      console.log(deliveryFormData);
      setdeliveryLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      await axios.post(
      'https://us-central1-shalom-103df.cloudfunctions.net/app/getFieldsForObject',
      { "objectReference" : 'Objects/FTnVjMe1aBlQVjlD8QcK',"profileReference":'Profile Object Permissions/0yoELNsmUx3JSuJWyLA9' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      ).then(function(resp){
        deliveryFormData = {};
          console.log(resp);
          for(const element in resp.data){
            const dataElement = resp.data[element];
            console.log(dataElement);
            console.log(dataElement._fieldsProto);
            if(dataElement._fieldsProto.Type.stringValue == 'Combobox'){
              dataElement._fieldsProto.Type.stringValue = 'ComboBox';
            }
            
            if(deliveryFormData[dataElement._fieldsProto.Type.stringValue]){
              deliveryFormData[dataElement._fieldsProto.Type.stringValue].push({
                  Name:dataElement._fieldsProto.Name.stringValue,
                  Type:dataElement._fieldsProto.Type.stringValue,
                  Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                  Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                  RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              });
            }
            else{
              deliveryFormData[dataElement._fieldsProto.Type.stringValue] = [{
                Name:dataElement._fieldsProto.Name.stringValue,
                Type:dataElement._fieldsProto.Type.stringValue,
                Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              }];
            }

          }
          window.localStorage.setItem("DeliveryFormData", JSON.stringify(deliveryFormData));
          console.log(deliveryFormData);
          deliveryDataRetrieved = true;
          console.log(deliveryFormData)
          setdeliveryLoading(false);
      })
      .catch(function(err){
          console.log(err);
          deliveryDataRetrieved = true;
          setdeliveryLoading(false);
      });
    }
  }
  

  const handleChange = async(e) => {
    
  }
  const handleSave = async(e) => {
    
  }
  
  useEffect(()=>{
    if(!deliveryDataRetrieved){
      deliveryDataRetrieved = true;
      getFieldsForObject();
      console.log('fired once');
    }
  },[]);

  if(deliveryLoading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Entregas</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">Pedidos</li>
                  <li className="breadcrumb-item active">Entrega</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      { deliveryFormData && deliveryFormData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state._fieldsProto:{}} goTo='/Delivery' formData={deliveryFormData} />}
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
export default DeliveryCreate;
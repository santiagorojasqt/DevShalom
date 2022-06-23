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
let formData;
let location;
let referenceObjectsData;

function DeliveryCreate() {
  const [loading,setLoading] = useState(false);
  location = useLocation()
  console.log(location)
  if(!loading&& !formData) setLoading(true);

  const getReferences = async()=>{
    referenceObjectsData = {};
    let tokenData = await auth.currentUser.getIdToken();
    let objectsToGet = [];
    for(const referenceField in  formData['RefCode']){
      let data = formData['RefCode'];
      console.log(data)
      console.log(data[referenceField]);
      objectsToGet.push(data[referenceField].RefObject);
    }
    let resp = await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/getReferenceObjets',
      { "objectsToGet" :  objectsToGet},
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
    );
    console.log(resp);
    for(const elementData in resp.data){
      const currenElement = resp.data[elementData];
      console.log(currenElement);
      for(const key in currenElement){
        referenceObjectsData[key] = [];
        const nexEl = currenElement[key];
        console.log(key);
        console.log(nexEl);
        for(const arrayMember in nexEl){
          const otherEl = nexEl[arrayMember];
          otherEl._fieldsProto['id'] = otherEl._ref._path.segments[0]+'/'+otherEl._ref._path.segments[1];
          referenceObjectsData[key].push(otherEl._fieldsProto);
        }
      }
    }
    setLoading(false);
  }


  const getFieldsForObject = async()=>{
    
    if(window.localStorage.getItem('DeliveryFormData')){
      
      setLoading(false);
      formData = JSON.parse(window.localStorage.getItem("DeliveryFormData"));
      console.log(formData);
      deliveryDataRetrieved = true;
      if(formData['RefCode']){
        await getReferences();
      }
      setLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      let resp = await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
      { "objectReference" : 'Objects/FTnVjMe1aBlQVjlD8QcK',"profileReference":'Profile Object Permissions/0yoELNsmUx3JSuJWyLA9' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      )

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
            console.log(dataElement._fieldsProto);
            formData[dataElement._fieldsProto.Type.stringValue] = [{
              Name:dataElement._fieldsProto.Name.stringValue,
              Type:dataElement._fieldsProto.Type.stringValue,
              Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
              Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
              RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
            }];
          }

        }
        window.localStorage.setItem("DeliveryFormData", JSON.stringify(formData));
        console.log(formData);
        deliveryDataRetrieved = true;
        console.log(formData)
        if(formData['RefCode']){
          await getReferences();
        }
        setLoading(false);
      
    }
  }
  
  useEffect(()=>{
    if(!deliveryDataRetrieved){
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
                      { formData && formData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state:{}} goTo='/Delivery' object='Entrega' referencesObject={referenceObjectsData} formData={formData} />}
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
import './public/css/style.css';
import './public/vendor/bootstrap/css/bootstrap.min.css';
import './public/vendor/bootstrap-icons/bootstrap-icons.css';
import './public/vendor/boxicons/css/boxicons.min.css';
import './public/vendor/quill/quill.snow.css';
import './public/vendor/quill/quill.bubble.css';
import './public/vendor/remixicon/remixicon.css';
import './public/vendor/simple-datatables/style.css';
import './public/css/style.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {auth} from './firebase';
import Loading from "./loading";
import Form from './Form';
import { Navigate, useLocation } from 'react-router-dom'

let requirementDataRetrieved = false;
let title;
let requirementFormData;
let location;
let referenceObjectsData;
function RequirementCreate() {
  const [requirementLoading,setrequirementLoading] = useState(false);
  location = useLocation()
  
  const getReferences = async()=>{
    
    referenceObjectsData = {};
    let tokenData = await auth.currentUser.getIdToken();
    let objectsToGet = [];
    for(const referenceField in  requirementFormData['RefCode']){
      let data = requirementFormData['RefCode'];
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
    setrequirementLoading(false);
  }
  
  const getFieldsForObject = async()=>{
    setrequirementLoading(true);
    if(window.localStorage.getItem('RequirementFormData')){
      requirementFormData = JSON.parse(window.localStorage.getItem("RequirementFormData"));
      if(requirementFormData['RefCode']){
        await getReferences();
      }
      setrequirementLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      let resp = await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
      { "objectReference" : 'Objects/KDFtf983EdDnWMXV6eAJ',"profileReference":'Profile Object Permissions/wZ2X8Vb01asLLSaLZ37t' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      )
      requirementFormData = {};
      console.log(resp);
      for(const element in resp.data){
        const dataElement = resp.data[element];
        console.log(dataElement);
        console.log(dataElement._fieldsProto);
        if(dataElement._fieldsProto.Type.stringValue == 'Combobox'){
          dataElement._fieldsProto.Type.stringValue = 'ComboBox';
        }
        
        if(requirementFormData[dataElement._fieldsProto.Type.stringValue]){
          requirementFormData[dataElement._fieldsProto.Type.stringValue].push({
              Name:dataElement._fieldsProto.Name.stringValue,
              Type:dataElement._fieldsProto.Type.stringValue,
              Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
              Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
              RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
          });
        }
        else{
          requirementFormData[dataElement._fieldsProto.Type.stringValue] = [{
            Name:dataElement._fieldsProto.Name.stringValue,
            Type:dataElement._fieldsProto.Type.stringValue,
            Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
            Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
            RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
          }];
        }

      }
      window.localStorage.setItem("RequirementFormData", JSON.stringify(requirementFormData));
      requirementDataRetrieved = true;
      if(requirementFormData['RefCode']){
        await getReferences();
      }
      setrequirementLoading(false);
    }
  }

  
  
  useEffect(()=>{
    if(!requirementDataRetrieved){
      requirementDataRetrieved = true;
      getFieldsForObject();
      console.log('fired once');
    }
  },[]);

  if(requirementLoading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Requerimientos</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">Pedidos</li>
                  <li className="breadcrumb-item active">Requerimiento</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      { requirementFormData && requirementFormData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state._fieldsProto:{}} goTo='/Requirement' object='Requerimientos' referencesObject={referenceObjectsData} formData={requirementFormData} />}
                      
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
export default RequirementCreate;
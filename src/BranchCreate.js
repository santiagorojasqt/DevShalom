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

let branchDataRetrieved = false;
let title;
let branchFormData;
let location;
function BranchCreate() {
  console.log('mounted');
  console.log('mounted');
  
  const [branchLoading,setbranchLoading] = useState(false);
  console.log('mounted');
  location = useLocation()
  console.log('mounted');
  const navigate2 = useNavigate()
  console.log('mounted');
  
  const getFieldsForObject = async()=>{
    setbranchLoading(true);
    if(window.localStorage.getItem('BranchFormData')){
      branchFormData = JSON.parse(window.localStorage.getItem("BranchFormData"));
      console.log(branchFormData);
      setbranchLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      await axios.post(
      'http://localhost:5001/shalom-103df/us-central1/app/getFieldsForObject',
      { "objectReference" : 'Objects/gC6aLoXOhzxj7O9PU8i8',"profileReference":'Profile Object Permissions/pB6eSuUiN2PDvunlRv1w' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      ).then(function(resp){
          branchFormData = {};
          console.log(resp);
          for(const element in resp.data){
            const dataElement = resp.data[element];
            console.log(dataElement);
            console.log(dataElement._fieldsProto);
            if(dataElement._fieldsProto.Type.stringValue == 'Combobox'){
              dataElement._fieldsProto.Type.stringValue = 'ComboBox';
            }
            
            if(branchFormData[dataElement._fieldsProto.Type.stringValue]){
              branchFormData[dataElement._fieldsProto.Type.stringValue].push({
                  Name:dataElement._fieldsProto.Name.stringValue,
                  Type:dataElement._fieldsProto.Type.stringValue,
                  Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                  Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                  RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              });
            }
            else{
              branchFormData[dataElement._fieldsProto.Type.stringValue] = [{
                Name:dataElement._fieldsProto.Name.stringValue,
                Type:dataElement._fieldsProto.Type.stringValue,
                Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              }];
            }

          }
          window.localStorage.setItem("BranchFormData", JSON.stringify(branchFormData));
          console.log(branchFormData);
          branchDataRetrieved = true;
          console.log(branchFormData)
          setbranchLoading(false);
      })
      .catch(function(err){
          console.log(err);
          branchDataRetrieved = true;
          setbranchLoading(false);
      });
    }
  }
  

  const handleChange = async(e) => {
    
  }
  const handleSave = async(e) => {
    
  }
  
  useEffect(()=>{
    if(!branchDataRetrieved){
      branchDataRetrieved = true;
      getFieldsForObject();
      console.log('fired once');
    }
  },[]);

  if(branchLoading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
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
                      { branchFormData && branchFormData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state._fieldsProto:{}} goTo='/Branch' object='Sede' formData={branchFormData} />}
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
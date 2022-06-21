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

let userDataRetrieved = false;
let title;
let userFormData;
let location;
function UserCreate() {
  console.log('mounted');
  console.log('mounted');
  
  const [userLoading,setuserLoading] = useState(false);
  console.log('mounted');
  location = useLocation()
  console.log('mounted');
  const navigate2 = useNavigate()
  console.log('mounted');
  
  const getFieldsForObject = async()=>{
    setuserLoading(true);
    if(window.localStorage.getItem('UserFormData')){
      userFormData = JSON.parse(window.localStorage.getItem("UserFormData"));
      console.log(userFormData);
      setuserLoading(false);
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      await axios.post(
      'https://us-central1-shalom-103df.cloudfunctions.net/app/getFieldsForObject',
      { "objectReference" : 'Objects/TbODR2sSss2kHWhHbBCG',"profileReference":'Profile Object Permissions/IHzlGi3A520RZcTBjUyv' },
      { headers: { 
          'Content-Type': 'application/json',
          'Authorization':  'Bearer '+tokenData
      } }
      ).then(function(resp){
        userFormData = {};
          console.log(resp);
          for(const element in resp.data){
            const dataElement = resp.data[element];
            console.log(dataElement);
            console.log(dataElement._fieldsProto);
            if(dataElement._fieldsProto.Type.stringValue == 'Combobox'){
              dataElement._fieldsProto.Type.stringValue = 'ComboBox';
            }
            
            if(userFormData[dataElement._fieldsProto.Type.stringValue]){
              userFormData[dataElement._fieldsProto.Type.stringValue].push({
                  Name:dataElement._fieldsProto.Name.stringValue,
                  Type:dataElement._fieldsProto.Type.stringValue,
                  Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                  Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                  RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              });
            }
            else{
              userFormData[dataElement._fieldsProto.Type.stringValue] = [{
                Name:dataElement._fieldsProto.Name.stringValue,
                Type:dataElement._fieldsProto.Type.stringValue,
                Length:dataElement._fieldsProto.Length?dataElement._fieldsProto.Length.integerValue:'',
                Values:dataElement._fieldsProto.values?dataElement._fieldsProto.values.stringValue:'',
                RefObject:dataElement._fieldsProto.RefObject?dataElement._fieldsProto.RefObject.stringValue:''
              }];
            }

          }
          window.localStorage.setItem("UserFormData", JSON.stringify(userFormData));
          console.log(userFormData);
          userDataRetrieved = true;
          console.log(userFormData)
          setuserLoading(false);
      })
      .catch(function(err){
          console.log(err);
          userDataRetrieved = true;
          setuserLoading(false);
      });
    }
  }
  

  const handleChange = async(e) => {
    
  }
  const handleSave = async(e) => {
    
  }
  
  useEffect(()=>{
    if(!userDataRetrieved){
      userDataRetrieved = true;
      getFieldsForObject();
      console.log('fired once');
    }
  },[]);

  if(userLoading){
    return <Loading  type="String" color="#000000" />;
  }
  else{
    return (
      <div className="App">
          <main id="main" className="main">
            <div className="pagetitle">
              <h1>Usuarios</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                  <li className="breadcrumb-item">Pedidos</li>
                  <li className="breadcrumb-item active">Usuario</li>
                </ol>
              </nav>
            </div>

            <section className="section">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      { userFormData && userFormData['Text'] &&  <Form values={location.state &&  location.state!== typeof undefined?location.state._fieldsProto:{}} goTo='/User' formData={userFormData} />}
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
export default UserCreate;
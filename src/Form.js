import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Alert } from "./Alert";
import axios from "axios";
import { auth } from "./firebase";
import Loading from "react-loading";
import * as values from './values';
import addServiceToRequirement from "./addServiceToRequirement";
function Form(props) {
  const [error, setError] = useState("");
  let [objectInfo, setObjectInfo] = useState({
  });

  const [loading, setLoading] = useState(false);
  if(props.values && props.values.data && !objectInfo.id){
    console.log(props.values.data);
    objectInfo = props.values.data;
    objectInfo['id']=props.values.id;

  }

  const navigate = useNavigate()
  const handleChange = ({ target: { value, name } }) =>{
    setObjectInfo({ ...objectInfo, [name]: value });
  }
  
  const handleSave = async(e) => {
    e.preventDefault();
    if(Object.keys(objectInfo).length<=0){
      setError('Pofavor digita los campos');
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      setLoading(true);
      console.log(objectInfo);
      await axios.post(
        'http://localhost:5001/shalom-103df/us-central1/app/createObject',
        { collection: props.object, values:objectInfo},
        { headers: { 
            'Content-Type': 'application/json',
            'Authorization':  'Bearer '+tokenData
        } }
        ).then(function(resp){
            console.log(resp);

            setLoading(false);
            goToBranch();
        })
        .catch(function(err){
            setLoading(false);
        });
      setError('');
    }
  }
  const addService = async(e)=>{
    e.preventDefault();
    if(Object.keys(objectInfo).length<=0){
      setError('Pofavor digita los campos');
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      setLoading(true);
      console.log(objectInfo);
      await axios.post(
        'http://localhost:5001/shalom-103df/us-central1/app/createObject',
        { collection: props.object, values:objectInfo},
        { headers: { 
            'Content-Type': 'application/json',
            'Authorization':  'Bearer '+tokenData
        } }
        ).then(function(resp){
            console.log(resp);
            setLoading(false);
            addServiceRoute(resp)
        })
        .catch(function(err){
            setLoading(false);
        });
      setError('');
    }
  }

  const addServiceRoute =(item)=>{
    console.log(item.id);
    console.log(item);
    navigate('/Service/add',{state:item},{ replace: true })
  }

  

  const goToBranch = async()=>{
    navigate(props.goTo);
  }

  return(
    <form>
       {error && <Alert message={error} />}
       {loading && <Loading type="String" color="#000000"  />}
      <div className="container">
        <div className="row">
          {props.formData && props.formData['Text'] && props.formData['Text'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label for="inputText" className="col-form-label">{item.Name}</label>
                    <div className="col-sm-10">
                      <input maxLength={item.Length} aria-current={item} required value={props.values && props.values.data && props.values.data[item.Name] && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} type={item.Name.includes('Email')?'email':'text'} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['ComboBox'] && props.formData['ComboBox'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label className="col-form-label" for={item.Name+item.Type}>{item.Name}</label>
                    <div className="col-sm-10">
                    <select aria-current={item} required value={props.values.data && props.values.data[item.Name] && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-select">
                      <option>Selecciona una opción</option>
                      {item.Values && values.default[item.Values.replace('.json','')] &&  values.default[item.Values.replace('.json','')].map((option) => (
                        <option value={option.Name}>{option.Name}</option>
                      ))}
                    </select>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['Number'] && props.formData['Number'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <input maxLength={item.Length} aria-current={item} required type="number" value={props.values && props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                  </div>
                </div>
              );
            })}

            {props.formData && props.values.data &&  props.formData['Date'] && props.formData['Date'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <input aria-current={item} required type="text" value={props.values && props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                  </div>
                </div>
              );
            })}

            {props.formData && !props.values.data &&  props.formData['Date'] && props.formData['Date'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <input aria-current={item} required type="text" value={props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                  </div>
                </div>
              );
            })}

            {props.formData && props.formData['Media'] && props.formData['Media'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <input aria-current={item} required type="file" onChange={handleChange} className="form-control"/>
                  </div>
                </div>
              );
            })}

            {props.formData && props.formData['RefCode'] && props.formData['RefCode'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <select aria-current={item} required value={props.values.data && props.values.data[item.Name] && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-select">
                      <option>Selecciona una opción</option>
                      {props.referencesObject && props.referencesObject[item.RefObject] && props.referencesObject[item.RefObject].map((option) => (
                        <option value={option.id}>{option.Nombre.stringValue}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="row">
            <div className="form-group col-sm-3">
              <button type="submit" className="btn btn-outline-dark " onClick={goToBranch}>Cancel</button>  
            </div>
            <div className="form-group col-sm-3">
              <button type="submit" onClick={handleSave} className="btn btn-primary ">Guardar</button>
            </div>
            { props.object && props.object == 'Requerimientos' &&
              <div className="form-group col-sm-3">
                <button type="submit" onClick={addService} className="btn btn-primary ">
                  <span>Guardar y Adicionar servicios</span></button>
              </div>
          }
        </div>
      </form>
  )
}
export default Form;
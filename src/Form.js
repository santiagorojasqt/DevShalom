import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, SetStateAction } from "react";
import { Alert } from "./Alert";
import axios from "axios";
import { auth } from "./firebase";
import Loading from "react-loading";
import * as values from './values';
import Select from "react-select";

let props ={};
function Form(props) {
  const [error, setError] = useState("");
  let [objectInfo, setObjectInfo] = useState({
  });

  const [loading, setLoading] = useState(false);
  if(props.values.data && !objectInfo.id){
    objectInfo = props.values;

  }

  const navigate = useNavigate()
  const handleChange = ({ target: { value, name } }) =>{
    setObjectInfo({ ...objectInfo, [name]: value });
    props.values.data[name]=value;
    
  }
  
  const handleSave = async(e) => {
    e.preventDefault();
    if(Object.keys(objectInfo).length<=0){
      setError('Pofavor digita los campos');
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      setLoading(true);
      await axios.post(
        'http://localhost:5001/shalom-103df/us-central1/app/createObject',
        { collection: props.object, values:objectInfo},
        { headers: { 
            'Content-Type': 'application/json',
            'Authorization':  'Bearer '+tokenData
        } }
        ).then(function(resp){
            setLoading(false);
            goToBranch();
        })
        .catch(function(err){
            setLoading(false);
        });
      setError('');
    }
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
                      <input maxLength={item.Length} aria-current={item} required value={props.values.data && props.values.data[item.Name] && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} type={item.Name.includes('Email')?'email':'text'} onChange={handleChange} className="form-control"/>
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
                    <input maxLength={item.Length} aria-current={item} required type="number" value={props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                  </div>
                </div>
              );
            })}

            {props.formData && props.values.data &&  props.formData['Date'] && props.formData['Date'].map(item => {
              return (
                <div className="form-group col-sm-6">
                  <label for="inputText" className="col-form-label">{item.Name}</label>
                  <div className="col-sm-10">
                    <input aria-current={item} required type="text" value={props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
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
                    <input aria-current={item} required type="date" value={props.values.data && props.values.data[item.Name]} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
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
                      {props.referencesObject && props.referencesObject[item.RefObject].map((option) => (
                        <option value={option.id}>{option.Nombre.stringValue}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
        <div className="form-group col-sm-6">
          <button type="submit" className="btn btn-outline-dark float-right" onClick={goToBranch}>Cancel</button>  
        </div>
        <div className="form-group col-sm-6">
          <button type="submit" onClick={handleSave} className="btn btn-primary float-right">Guardar</button>
        </div>
      </form>
  )
}
export default Form;
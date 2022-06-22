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
  console.log(values.default['Municipios']);
  const [error, setError] = useState("");
  const [objectInfo, setObjectInfo] = useState({
  });

  const [loading, setLoading] = useState(false);
  console.log(props.values);
  console.log(props.values[0]);
  const navigate = useNavigate()
  const handleChange = ({ target: { value, name } }) =>
    setObjectInfo({ ...objectInfo, [name]: value });
  const handleChangeComboBox = (event,Name,item) => {
    console.log(event);
    console.log(Name);
    setObjectInfo({ ...objectInfo, [Name]: event.Name });
    props.values[Name] = event.Name;
  };
  
  const handleSave = async(e) => {
    e.preventDefault();
    if(Object.keys(objectInfo).length<=0){
      console.log('empty');
      setError('Pofavor digita los campos');
    }
    else{
      let tokenData = await auth.currentUser.getIdToken();
      setLoading(true);
      await axios.post(
        'http://localhost:5001/shalom-103df/us-central1/app//createObject',
        { collection: props.object, values:objectInfo},
        { headers: { 
            'Content-Type': 'application/json',
            'Authorization':  'Bearer '+tokenData
        } }
        ).then(function(resp){
            console.log(resp.data);
            setLoading(false);
            goToBranch();
        })
        .catch(function(err){
            console.log(err);
            setLoading(false);
        });
      setError('');
      console.log(objectInfo);
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
                      <input aria-current={item} required value={props.values[item.Name] && props.values[item.Name].stringValue} name={item.Name} id={item.Name+item.Type} type={item.Name.includes('Email')?'email':'text'} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['ComboBox'] && props.formData['ComboBox'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label className="col-form-label" for={item.Name+item.Type}>{item.Name}</label>
                    <div className="col-sm-10">
                    <select aria-current={item} required value={props.values[item.Name] && props.values[item.Name].stringValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-select">
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
                      <input aria-current={item} required type="number" value={props.values[item.Name]&& props.values[item.Name].integerValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['Date'] && props.formData['Date'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label for="inputText" className="col-form-label">{item.Name}</label>
                    <div className="col-sm-10">
                      <input aria-current={item} required type="date" value={props.values[item.Name]&& props.values[item.Name].integerValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}

            {props.formData && props.formData['Media'] && props.formData['Media'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label for="inputText" className="col-form-label">{item.Name}</label>
                    <div className="col-sm-10">
                      <input aria-current={item} required type="date" value={props.values[item.Name]&& props.values[item.Name].integerValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}

            {props.formData && props.formData['Reference'] && props.formData['Reference'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label for="inputText" className="col-form-label">{item.Name}</label>
                    <div className="col-sm-10">
                      <input aria-current={item} required type="Text" value={props.values[item.Name]&& props.values[item.Name].integerValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
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
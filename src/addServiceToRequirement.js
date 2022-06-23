import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { Navigate, useLocation } from "react-router-dom";
import { Alert } from "./Alert";
import { auth } from "./firebase";
let allServices;
let servicesRetrieved;
let location;
function AddServiceToRequirement() {

    location = useLocation()
    let [objectInfo, setObjectInfo] = useState({
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const goToRequirement =()=>{
        Navigate('/Service')
    }

    if(!loading&& !allServices) setLoading(true);

    const getAllServices = async()=>{
        objectInfo = {}
        allServices = {};
        setLoading(true);
        console.log(location);
        let tokenData = await auth.currentUser.getIdToken();
        allServices = await axios.post(
        'http://localhost:5001/shalom-103df/us-central1/app/getAllServices',
        { example: 'data' },
        { headers: { 
            'Content-Type': 'application/json',
            'Authorization':  'Bearer '+tokenData
        } });  
        servicesRetrieved = true;
        allServices = allServices.data;
        console.log(allServices);
        setLoading(false);
    };
    
    const handleChange = ({ target: { value, name } }) =>{
        console.log(value, name);
        setObjectInfo({ ...objectInfo, [name]: value });
    }

    const saveAllServices=async()=>{
        goToRequirement();
    };

    useEffect(()=>{
        if(!servicesRetrieved){
            getAllServices();
            servicesRetrieved = true;
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
                <h5 className="card-title">Añadir Servicios</h5>
                                <form>
                                    {error && <Alert message={error} />}
                                    {loading && <Loading type="String" color="#000000"  />}
                                    <div className="container">
                                        <div className="row"></div>
                                    </div>
                                    <table className='table thead-light'>
                                        <thead>
                                            <tr>
                                            <th scope="col">Seleccionar</th>    
                                            <th scope="col">Nombre Servicio</th>
                                            <th scope="col">Precio</th>
                                            <th scope="col">Iva (En Pesos)</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Precio Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allServices && allServices.map(item => {
                                            return (
                                                <tr key={item}>
                                                    <td scope="row">
                                                        <div className="form-group col-sm-2">
                                                            <input name="Selected" type="checkbox" onChange={() => handleChange(item)} className="form-control"/>
                                                        </div>
                                                    </td>
                                                    <td scope="row">{ item.data['Codigo'] && item.data['Codigo'] }</td>
                                                    <td scope="row">{ item.data['Precio (En Pesos)'] && item.data['Precio (En Pesos)'] }</td>
                                                    <td scope="row">{ item.data['Iva (En Pesos)'] && item.data['Iva (En Pesos)'] }</td>
                                                    <td scope="row"><input type="number" name={`"${item.id} Cantidad"`} onChange={handleChange} className="form-control"/></td>
                                                    <td scope="row"><input name="Precio Total" value={objectInfo && Number(objectInfo[`"${item.id} Cantidad"`])>0?Number(objectInfo[`"${item.id} Cantidad"`]) * Number(item.data['Precio (En Pesos)']):0} readOnly onChange={() => handleChange(item)} className="form-control"/></td>
                                                </tr>
                                            );
                                            })}
                                        </tbody>
                                        </table>

                                        <div className="row">
                                            <div className="form-group col-sm-12">
                                            <center><button type="submit" className="btn btn-primary " >Guardar</button></center>
                                            </div>
                                        </div>
                                </form>
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
export default AddServiceToRequirement;
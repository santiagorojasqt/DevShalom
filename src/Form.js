import { useNavigate } from "react-router-dom";
function Form(props) {
  console.log(props.values);
  console.log(props.values[0]);
  const navigate = useNavigate()
  const handleChange = async(e) => {
  }
  const handleSave = async(e) => {
  }
  const goToBranch = async()=>{
    navigate('/Branch')
  }
  return(
    <form>
      <div className="container">
        <div className="row">
          {props.formData && props.formData['Text'] && props.formData['Text'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label for="inputText" className="col-form-label">{item.Name}</label>
                    <div className="col-sm-10">
                      <input aria-current={item} value={props.values[item.Name] && props.values[item.Name].stringValue} name={item.Name} id={item.Name+item.Type} type="text" onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['ComboBox'] && props.formData['ComboBox'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    <label className="col-form-label" for={item.Name+item.Type}>{item.Name}</label>
                    <div className="col-sm-10">
                      <select aria-current={item} defaultValue={props.values[item.Name] && props.values[item.Name].stringValue} name={item.Name} id={item.Name+item.Type} className="form-select" onChange={handleChange} aria-label="Default select example">
                        <option >Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
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
                      <input aria-current={item} type="number" value={props.values[item.Name]&& props.values[item.Name].integerValue} name={item.Name} id={item.Name+item.Type} onChange={handleChange} className="form-control"/>
                    </div>
                  </div>
                );
            })}
            {props.formData && props.formData['Date']>0 && props.formData['Date'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    { }
                  </div>
                );
            })}

            {props.formData && props.formData['Media']>0 && props.formData['Media'].map(item => {
                return (
                  <div className="form-group col-sm-6">
                    { }
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
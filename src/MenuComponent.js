

import { Link, useNavigate } from "react-router-dom";

function ListItem(props) {
  // Correcto! No hay necesidad de especificar la key aquí:
  console.log(props.url);
  return <li> <Link to={props.url} className="active" ><i class="bi bi-circle"></i><span>{props.value}</span></Link></li>;
}

function MenuComponent(props) {
  console.log(props.listValue);
  console.log(props);
  let list = [];
  props.listValue.forEach(element => {
    console.log(element);
    list.push(<ListItem key={element.url} value={element.value} url={element.url}/>);
  });

  
  
  console.log(list);
  return (
    <ul id="components-nav" className="nav-content collapse show" data-bs-parent="#sidebar-nav">
      {list}
    </ul>
  );

}
export default MenuComponent;
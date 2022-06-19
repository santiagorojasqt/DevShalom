
function ListItem(props) {
  // Correcto! No hay necesidad de especificar la key aquí:
  return <li>{props.value}</li>;
}

function MenuComponent(Objects) {
  console.log(Objects);
  const listItems = Object.values(Objects).map((element) =>
    console.log(element) &&
    // Correcto! La key debería ser especificada dentro del array.
    <ListItem key={element.toString()} value={element} />
  );
  return (
    {listItems}
  );

}
export default MenuComponent;
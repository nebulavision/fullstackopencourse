function Suma(props){
    return <h1 style={ {color: props.color} }>El resultado es: { parseInt(props.a) + parseInt(props.b) }</h1>
    
}

export default Suma;
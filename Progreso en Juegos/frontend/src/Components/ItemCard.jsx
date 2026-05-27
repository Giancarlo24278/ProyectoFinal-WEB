function Carta({ item }) {
  return (
    <div>
      <h2>{item.nombre}</h2>

      <p>
        {item.atributos.progreso}%
      </p>

      <img
        src={item.atributos.imagen}
        alt={item.nombre}
        width="200"
      />
    </div>
  )
}

export default Carta
function ItemCard({ item, eliminarItem }) {
  return (
    <div className="card">
      <img
        src={item.atributos.imagen}
        alt={item.nombre}
        width="300"
      />

      <h2>{item.nombre}</h2>

      <p>
        {item.atributos.horasJugadas} /{' '}
        {item.atributos.horasTotales} horas
      </p>

      <div className="barra">
        <div
          className="progreso"
          style={{
            width: `${item.atributos.progreso}%`
          }}
        ></div>
      </div>

      <p>{item.atributos.progreso}% completado</p>

      <button onClick={() => eliminarItem(item.id)}>
        Eliminar
      </button>
    </div>
  )
}

export default ItemCard
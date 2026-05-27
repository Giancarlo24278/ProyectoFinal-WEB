function ItemCard({ item, onEliminar }) {
  return (
    <div className="card">
      <img
        src={item.atributos.imagen}
        alt={item.nombre}
      />

      <div className="card-content">
        <h2>
          {item.categoria?.emoji} {item.nombre}
        </h2>

        <p>
          {item.atributos.horasJugadas} /
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

        <p>
          {item.atributos.progreso}% completado
        </p>

        <button
          className="btn-eliminar"
          onClick={() => onEliminar(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ItemCard
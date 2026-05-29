import React from 'react'

function ItemCard({ item, onEliminar, onCambiarEstado }) {
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

        <p>{item.categoriaNombre || item.categoriaId}</p>

        <p>
          {item.atributos.horasJugadas} / {item.atributos.horasTotales} horas
        </p>

        <div className="barra">
          <div
            className="progreso"
            style={{
              width: `${item.atributos.progreso}%`,
            }}
          ></div>
        </div>

        <p>{item.atributos.progreso}% completado</p>

        <select
          value={item.estado}
          onChange={(e) =>
            onCambiarEstado(item.id, e.target.value)
          }
        >
          <option value="jugando">Jugando</option>
          <option value="completado">Completado</option>
          <option value="pausado">Pausado</option>
        </select>

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

export default React.memo(ItemCard)
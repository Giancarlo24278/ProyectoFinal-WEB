function Carta({ item }) {
  return (
    <div className="card">
      <img
        src={item.atributos.imagen}
        alt={item.nombre}
      />

      <div className="card-content">
        <h2>{item.nombre}</h2>

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
      </div>
    </div>
  )
}
export default Carta
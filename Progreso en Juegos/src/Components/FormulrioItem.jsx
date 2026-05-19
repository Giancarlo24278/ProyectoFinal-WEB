import { useState } from 'react'
import { categorias } from '../utils/categorias'

function FormularioItem({ agregarItem }) {
  const [nombre, setNombre] = useState('')
  const [categoriaId, setCategoriaId] = useState('rpg')
  const [horasJugadas, setHorasJugadas] = useState('')
  const [horasTotales, setHorasTotales] = useState('')
  const [imagen, setImagen] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const progreso =
      horasTotales > 0
        ? Math.round((horasJugadas / horasTotales) * 100)
        : 0

    const nuevoItem = {
      id: crypto.randomUUID(),
      nombre,
      categoriaId,
      estado: 'jugando',
      puntuacion: null,
      fechaRegistro: new Date().toISOString(),
      fechaActividad: new Date().toISOString(),
      notas: '',
      atributos: {
        horasJugadas: Number(horasJugadas),
        horasTotales: Number(horasTotales),
        progreso,
        imagen
      },
      activo: true
    }

    agregarItem(nuevoItem)

    setNombre('')
    setHorasJugadas('')
    setHorasTotales('')
    setImagen('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Juego</h2>

      <input
        type="text"
        placeholder="Nombre del juego"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <select
        value={categoriaId}
        onChange={(e) => setCategoriaId(e.target.value)}
      >
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.emoji} {categoria.nombre}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Horas jugadas"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Horas para completar"
        value={horasTotales}
        onChange={(e) => setHorasTotales(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="URL imagen"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />

      <button type="submit">Guardar Juego</button>
    </form>
  )
}

export default FormularioItem
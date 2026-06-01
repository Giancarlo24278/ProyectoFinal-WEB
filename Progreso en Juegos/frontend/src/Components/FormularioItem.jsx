import { useContext, useEffect, useRef, useState } from 'react'
import { categorias } from '../Utils/Categorias'
import { StorageContext } from '../Context/StorageProvider'

function FormularioItem() {
  const { guardarItem } = useContext(StorageContext)
  const inputRef = useRef(null)
  const intervalRef = useRef(null)
  const [nombre, setNombre] = useState('')
  const [categoriaId, setCategoriaId] = useState('rpg')
  const [horasJugadas, setHorasJugadas] = useState('')
  const [horasTotales, setHorasTotales] = useState('')
  const [imagen, setImagen] = useState('')

  useEffect(() => {
    inputRef.current?.focus()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

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

    guardarItem(nuevoItem)

    setNombre('')
    setHorasJugadas('')
    setHorasTotales('')
    setImagen('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Juego</h2>

      <input
        ref={inputRef}
        id="input-juego"
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
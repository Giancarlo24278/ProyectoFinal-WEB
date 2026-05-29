import { categorias } from '../utils/Categorias'

export default function FiltersPanel({
  busqueda,
  filtroCategoria,
  filtroEstado,
  onChangeFiltro,
  onChangeBusqueda,
  onLimpiar,
}) {
  return (
    <div className="filters-panel">
      <input
        type="text"
        placeholder="Buscar juego"
        value={busqueda}
        onChange={(e) => onChangeBusqueda(e.target.value)}
      />

      <select
        value={filtroCategoria}
        onChange={(e) =>
          onChangeFiltro('filtroCategoria', e.target.value)
        }
      >
        <option value="todas">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.emoji} {categoria.nombre}
          </option>
        ))}
      </select>

      <select
        value={filtroEstado}
        onChange={(e) =>
          onChangeFiltro('filtroEstado', e.target.value)
        }
      >
        <option value="todos">Todos los estados</option>
        <option value="jugando">Jugando</option>
        <option value="completado">Completado</option>
        <option value="pausado">Pausado</option>
      </select>

      <button onClick={onLimpiar}>Limpiar filtros</button>
    </div>
  )
}
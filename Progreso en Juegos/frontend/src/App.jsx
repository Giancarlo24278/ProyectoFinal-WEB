import { useCallback, useContext, useMemo } from 'react'
import {
  StorageContext,
} from './context/StorageProvider'
import {
  ThemeContext,
} from './context/ThemeProvider'

import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'
import FiltersPanel from './components/FiltersPanel'
import StatsCards from './components/StatsCards'
import ActivityChart from './components/charts/ActivityChart'
import CategoryChart from './components/charts/CategoryChart'
import OriginalChart from './components/charts/OriginalChart'

function getLast7Days() {
  const days = []
  const hoy = new Date()

  for (let i = 6; i >= 0; i--) {
    const d = new Date(hoy)
    d.setDate(hoy.getDate() - i)

    days.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: '2-digit',
      }),
    })
  }

  return days
}

function App() {
  const {
    items,
    historial,
    filtroCategoria,
    filtroEstado,
    busqueda,
    filtrar,
    limpiarFiltros,
    eliminarItem,
    cambiarEstadoItem,
    registrarActividad,
    setModo,
    modo,
  } = useContext(StorageContext)

  const { toggleTema } = useContext(ThemeContext)

  const itemsVisibles = useMemo(() => {
    return items.filter((item) => {
      const coincideCategoria =
        filtroCategoria === 'todas' ||
        item.categoriaId === filtroCategoria

      const coincideEstado =
        filtroEstado === 'todos' ||
        item.estado === filtroEstado

      const coincideBusqueda =
        item.nombre
          .toLowerCase()
          .includes(busqueda.toLowerCase())

      return item.activo && coincideCategoria && coincideEstado && coincideBusqueda
    })
  }, [items, filtroCategoria, filtroEstado, busqueda])

  const stats = useMemo(() => {
    const total = items.length
    const visibles = itemsVisibles.length
    const completados = items.filter(
      (item) => item.estado === 'completado'
    ).length
    const archivados = items.filter(
      (item) => !item.activo
    ).length

    return {
      total,
      visibles,
      completados,
      archivados,
    }
  }, [items, itemsVisibles])

  const activityData = useMemo(() => {
    const days = getLast7Days()
    const idsVisibles = new Set(
      itemsVisibles.map((item) => item.id)
    )

    return days.map((day) => ({
      dia: day.label,
      cantidad: historial.filter((registro) => {
        const fecha = registro.fecha.slice(0, 10)
        return fecha === day.key && idsVisibles.has(registro.itemId)
      }).length,
    }))
  }, [historial, itemsVisibles])

  const categoryData = useMemo(() => {
    const conteo = {}

    itemsVisibles.forEach((item) => {
      const key = item.categoriaId
      conteo[key] = (conteo[key] || 0) + 1
    })

    return Object.entries(conteo).map(([name, value]) => ({
      name,
      value,
    }))
  }, [itemsVisibles])

  const originalData = useMemo(() => {
    const grupos = {}

    itemsVisibles.forEach((item) => {
      const key = item.categoriaId

      if (!grupos[key]) {
        grupos[key] = {
          categoria: key,
          promedio: 0,
          count: 0,
        }
      }

      grupos[key].promedio += item.atributos?.progreso || 0
      grupos[key].count += 1
    })

    return Object.values(grupos).map((item) => ({
      categoria: item.categoria,
      promedio: item.count
        ? Math.round(item.promedio / item.count)
        : 0,
    }))
  }, [itemsVisibles])

  const onChangeFiltro = useCallback(
    (campo, valor) => {
      filtrar(campo, valor)
    },
    [filtrar]
  )

  const onChangeBusqueda = useCallback(
    (valor) => {
      filtrar('busqueda', valor)
    },
    [filtrar]
  )

  const onEliminar = useCallback(
    (id) => {
      eliminarItem(id)
      registrarActividad(id, 'ELIMINAR')
    },
    [eliminarItem, registrarActividad]
  )

  const onCambiarEstado = useCallback(
    (id, estado) => {
      cambiarEstadoItem(id, estado)
      registrarActividad(id, 'CAMBIAR_ESTADO')
    },
    [cambiarEstadoItem, registrarActividad]
  )

  const onLimpiar = useCallback(() => {
    limpiarFiltros()
  }, [limpiarFiltros])

  return (
    <div className="container fase3">
      <header className="topbar">
        <div>
          <h1>🎮 Steam Tracker</h1>
          <p>
            useReducer, Recharts, useMemo, useCallback y React.memo
          </p>
        </div>

        <div className="topbar-actions">
          <button onClick={toggleTema}>Cambiar tema</button>
          <button
            onClick={() =>
              setModo(modo === 'local' ? 'api' : 'local')
            }
          >
            Modo: {modo}
          </button>
        </div>
      </header>

      <StatsCards
        total={stats.total}
        visibles={stats.visibles}
        completados={stats.completados}
        archivados={stats.archivados}
      />

      <FiltersPanel
        busqueda={busqueda}
        filtroCategoria={filtroCategoria}
        filtroEstado={filtroEstado}
        onChangeFiltro={onChangeFiltro}
        onChangeBusqueda={onChangeBusqueda}
        onLimpiar={onLimpiar}
      />

      <FormularioItem />

      <section className="charts-grid">
        <ActivityChart data={activityData} />
        <CategoryChart data={categoryData} />
        <OriginalChart data={originalData} />
      </section>

      <ListaItems
        items={itemsVisibles}
        onEliminar={onEliminar}
        onCambiarEstado={onCambiarEstado}
      />
    </div>
  )
}

export default App
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

import {
  itemsReducer,
  estadoInicial,
} from '../reducers/itemsReducer'

import { useLocalStorage }
from '../hooks/useLocalStorage'

export const StorageContext = createContext()

export function StorageProvider({ children }) {


const [modo, setModoState] =
  useLocalStorage(
    'modo',
    'local'
  )

  const [estado, dispatch] = useReducer(
    itemsReducer,
    estadoInicial
  )

  const setModo = (nuevoModo) => {
    setModoState(nuevoModo)
  }

  const obtenerItems = useCallback(() => {
    const items = JSON.parse(
      localStorage.getItem('items') || '[]'
    )

    const historial = JSON.parse(
      localStorage.getItem('historial') || '[]'
    )

    dispatch({
      type: 'HIDRATAR',
      payload: {
        lista: items,
        historial,
      },
    })
  }, [])

  useEffect(() => {
    obtenerItems()
  }, [obtenerItems])

  const guardarItem = useCallback((item) => {
    dispatch({
      type: 'AGREGAR',
      payload: item,
    })

    const itemsActualizados = [
      ...JSON.parse(localStorage.getItem('items') || '[]'),
      item,
    ]

    localStorage.setItem(
      'items',
      JSON.stringify(itemsActualizados)
    )
  }, [])

  const eliminarItem = useCallback((id) => {
    dispatch({
      type: 'ELIMINAR',
      payload: id,
    })

    const items = JSON.parse(
      localStorage.getItem('items') || '[]'
    )

    const itemsActualizados = items.map((item) =>
      item.id === id
        ? { ...item, activo: false }
        : item
    )

    localStorage.setItem(
      'items',
      JSON.stringify(itemsActualizados)
    )
  }, [])

  const cambiarEstadoItem = useCallback((id, estado) => {
    dispatch({
      type: 'CAMBIAR_ESTADO',
      payload: { id, estado },
    })

    const items = JSON.parse(
      localStorage.getItem('items') || '[]'
    )

    const itemsActualizados = items.map((item) =>
      item.id === id
        ? { ...item, estado }
        : item
    )

    localStorage.setItem(
      'items',
      JSON.stringify(itemsActualizados)
    )
  }, [])

  const filtrar = useCallback((campo, valor) => {
    dispatch({
      type: 'FILTRAR',
      payload: { campo, valor },
    })
  }, [])

  const limpiarFiltros = useCallback(() => {
    dispatch({ type: 'LIMPIAR_FILTROS' })
  }, [])

  const registrarActividad = useCallback((itemId, tipo) => {
    const registro = {
      itemId,
      tipo,
      fecha: new Date().toISOString(),
    }

    dispatch({
      type: 'REGISTRAR_ACTIVIDAD',
      payload: registro,
    })

    const historial = JSON.parse(
      localStorage.getItem('historial') || '[]'
    )

    localStorage.setItem(
      'historial',
      JSON.stringify([...historial, registro])
    )
  }, [])

  const value = useMemo(
    () => ({
      modo,
      setModo,
      items: estado.lista,
      historial: estado.historial,
      filtroCategoria: estado.filtroCategoria,
      filtroEstado: estado.filtroEstado,
      busqueda: estado.busqueda,
      obtenerItems,
      guardarItem,
      eliminarItem,
      cambiarEstadoItem,
      filtrar,
      limpiarFiltros,
      registrarActividad,
    }),
    [
      modo,
      estado.lista,
      estado.historial,
      estado.filtroCategoria,
      estado.filtroEstado,
      estado.busqueda,
      obtenerItems,
      guardarItem,
      eliminarItem,
      cambiarEstadoItem,
      filtrar,
      limpiarFiltros,
      registrarActividad,
    ]
  )

  return (
    <StorageContext.Provider value={value}>
      {children}
    </StorageContext.Provider>
  )
}
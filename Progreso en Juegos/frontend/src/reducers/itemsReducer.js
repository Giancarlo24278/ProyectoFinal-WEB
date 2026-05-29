export const estadoInicial = {
  lista: [],
  filtroCategoria: 'todas',
  filtroEstado: 'todos',
  busqueda: '',
  historial: [],
}

export function itemsReducer(estado, accion) {
  switch (accion.type) {
    case 'HIDRATAR':
      return {
        ...estado,
        lista: accion.payload.lista ?? [],
        historial: accion.payload.historial ?? [],
      }

    case 'AGREGAR':
      return {
        ...estado,
        lista: [...estado.lista, accion.payload],
      }

    case 'ELIMINAR':
      return {
        ...estado,
        lista: estado.lista.map((item) =>
          item.id === accion.payload
            ? { ...item, activo: false }
            : item
        ),
      }

    case 'CAMBIAR_ESTADO':
      return {
        ...estado,
        lista: estado.lista.map((item) =>
          item.id === accion.payload.id
            ? { ...item, estado: accion.payload.estado }
            : item
        ),
      }

    case 'FILTRAR':
      return {
        ...estado,
        [accion.payload.campo]: accion.payload.valor,
      }

    case 'LIMPIAR_FILTROS':
      return {
        ...estado,
        filtroCategoria: 'todas',
        filtroEstado: 'todos',
        busqueda: '',
      }

    case 'REGISTRAR_ACTIVIDAD':
      return {
        ...estado,
        historial: [...estado.historial, accion.payload],
      }

    default:
      throw new Error(`Acción desconocida: ${accion.type}`)
  }
}
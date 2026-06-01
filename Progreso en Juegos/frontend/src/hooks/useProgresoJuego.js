import { useMemo } from 'react'

/**
 * Calcula estadísticas de progreso
 * para una colección de juegos.
 *
 * @param {Array} juegos
 *
 * @returns {{
 * promedio:number,
 * completados:number,
 * pendientes:number,
 * total:number
 * }}
 */
export function useProgresoJuego(juegos) {
  return useMemo(() => {
    const total = juegos.length

    const completados = juegos.filter(
      (juego) =>
        juego.estado === 'completado'
    ).length

    const pendientes =
      total - completados

    const suma = juegos.reduce(
      (acc, juego) =>
        acc +
        (juego.atributos?.progreso || 0),
      0
    )

    const promedio =
      total > 0
        ? Math.round(suma / total)
        : 0

    return {
      promedio,
      completados,
      pendientes,
      total,
    }
  }, [juegos])
}
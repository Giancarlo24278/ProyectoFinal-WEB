import { useMemo } from 'react'

/**
 * Calcula estadísticas globales
 * de la colección de juegos.
 *
 * @param {Array} juegos
 */
export function useProgresoJuego(juegos) {
  return useMemo(() => {
    const total = juegos.length

    const completados = juegos.filter(
      (juego) =>
        juego.estado === 'completado'
    ).length

    const archivados = juegos.filter(
      (juego) => !juego.activo
    ).length

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
      total,
      completados,
      archivados,
      promedio,
    }
  }, [juegos])
}
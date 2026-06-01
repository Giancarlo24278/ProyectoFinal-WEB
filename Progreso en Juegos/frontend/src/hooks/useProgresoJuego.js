import { useMemo } from 'react'

/**
 * Hook de dominio Steam Tracker.
 *
 * @param {Array} juegos
 */
export function useProgresoJuego(
  juegos
) {
  return useMemo(() => {
    const total = juegos.length

    const completados =
      juegos.filter(
        (j) =>
          j.estado === 'completado'
      ).length

    const suma = juegos.reduce(
      (acc, juego) =>
        acc +
        (juego.atributos
          ?.progreso || 0),
      0
    )

    const promedio =
      total > 0
        ? Math.round(
            suma / total
          )
        : 0

    return {
      total,
      completados,
      promedio,
    }
  }, [juegos])
}
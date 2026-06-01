import { useEffect } from 'react'

/**
 * Escucha una combinación de teclas.
 *
 * @param {string} tecla
 * @param {Function} onPress
 * @param {{ctrl?:boolean}} opciones
 */
export function useAtajoTeclado(
  tecla,
  onPress,
  { ctrl = false } = {}
) {
  useEffect(() => {
    const handler = (e) => {
      const enInput =
        ['INPUT', 'TEXTAREA'].includes(
          e.target.tagName
        )

      if (enInput) return

      if (ctrl && !e.ctrlKey) return

      if (
        e.key.toLowerCase() !==
        tecla.toLowerCase()
      ) {
        return
      }

      e.preventDefault()

      onPress(e)
    }

    window.addEventListener(
      'keydown',
      handler
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handler
      )
    }
  }, [tecla, onPress, ctrl])
}
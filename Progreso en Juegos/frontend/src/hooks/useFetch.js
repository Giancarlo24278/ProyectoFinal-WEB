import {
  useEffect,
  useState
} from 'react'

/**
 * Hook reutilizable para fetch.
 *
 * @param {string} url
 */
export function useFetch(url) {
  const [data, setData] = useState(null)
  const [cargando, setCargando] =
    useState(true)
  const [error, setError] =
    useState(null)

  useEffect(() => {
    if (!url) {
      setCargando(false)
      return
    }

    const controller =
      new AbortController()

    async function cargar() {
      try {
        setCargando(true)
        setError(null)

        const response =
          await fetch(url, {
            signal: controller.signal,
          })

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}`
          )
        }

        const json =
          await response.json()

        setData(json)
      } catch (err) {
        if (
          err.name !== 'AbortError'
        ) {
          setError(err.message)
        }
      } finally {
        setCargando(false)
      }
    }

    cargar()

    return () => {
      controller.abort()
    }
  }, [url])

  return {
    data,
    cargando,
    error,
  }
}
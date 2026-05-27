import {
  createContext,
  useCallback,
  useEffect,
  useState
} from 'react'

export const StorageContext = createContext()

export function StorageProvider({ children }) {
  const [modo, setModoState] = useState(
    () => localStorage.getItem('modo') || 'local'
  )

  const [items, setItems] = useState([])

  const API_URL = 'http://localhost:3000'

  const setModo = (nuevoModo) => {
    setModoState(nuevoModo)

    localStorage.setItem(
      'modo',
      nuevoModo
    )
  }

  const obtenerItems = useCallback(async () => {
    try {
      if (modo === 'api') {
        const response = await fetch(
          `${API_URL}/api/items`
        )

        const data = await response.json()

        setItems(data)
      } else {
        const data = JSON.parse(
          localStorage.getItem('items') || '[]'
        )

        setItems(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [modo])

  const guardarItem = async (item) => {
    try {
      if (modo === 'api') {
        await fetch(`${API_URL}/api/items`, {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(item)
        })

        obtenerItems()
      } else {
        const nuevosItems = [
          ...items,
          item
        ]

        localStorage.setItem(
          'items',
          JSON.stringify(nuevosItems)
        )

        setItems(nuevosItems)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const eliminarItem = async (id) => {
    try {
      if (modo === 'api') {
        await fetch(
          `${API_URL}/api/items/${id}`,
          {
            method: 'DELETE'
          }
        )

        obtenerItems()
      } else {
        const nuevosItems =
          items.filter(
            (item) => item.id !== id
          )

        localStorage.setItem(
          'items',
          JSON.stringify(nuevosItems)
        )

        setItems(nuevosItems)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerItems()
  }, [obtenerItems])

  return (
    <StorageContext.Provider
      value={{
        modo,
        setModo,
        items,
        obtenerItems,
        guardarItem,
        eliminarItem
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
import { useContext, useEffect, useRef } from 'react'

import { StorageContext } from './context/StorageProvider'
import { ThemeContext } from './context/ThemeProvider'

import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'

function App() {
  // Extraemos 'eliminarItem' del contexto de almacenamiento junto a los demás datos
  const {
    items,
    modo,
    setModo,
    eliminarItem 
  } = useContext(StorageContext)

  const { toggleTema } =
    useContext(ThemeContext)
    
  const intervalRef = useRef()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('autosave activo')
    }, 5000)

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        document
          .getElementById('input-juego')
          ?.focus()
      }

      if (e.key === 't') {
        toggleTema()
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [toggleTema])

  return (
    <div className="container">
      <h1>🎮 Steam Tracker</h1>

      <button
        onClick={() =>
          setModo(
            modo === 'local'
              ? 'api'
              : 'local'
          )
        }
      >
        Modo: {modo}
      </button>

      <button onClick={toggleTema}>
        Cambiar Tema
      </button>

      <FormularioItem />

      {/* Ahora sí le pasamos la función al componente de la lista */}
      <ListaItems items={items} eliminarItem={eliminarItem} />
    </div>
  )
}

export default App
import { useContext, useEffect } from 'react'

import { StorageContext } from './context/StorageProvider'
import { ThemeContext } from './context/ThemeProvider'

import FormularioItem from './components/FormularioItem'
import ListaItems from './components/ListaItems'

function App() {
  const {
    items,
    modo,
    setModo
  } = useContext(StorageContext)

  const { toggleTema } =
    useContext(ThemeContext)

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

      <ListaItems items={items} />
    </div>
  )
}

export default App
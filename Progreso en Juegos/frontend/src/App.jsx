import { useEffect, useState } from 'react'

import FormularioItem from './Components/FormularioItems'
import ListaItems from './Components/ListaItems'

import { obtenerItems, guardarItems } from './Services/Almacen'

import './App.css'

function App() {
  const [items, setItems] = useState(() => obtenerItems())

  useEffect(() => {
    guardarItems(items)
  }, [items])

  const agregarItem = (nuevoItem) => {
    setItems([...items, nuevoItem])
  }

  const eliminarItem = (id) => {
    const nuevosItems = items.filter(
      (item) => item.id !== id
    )

    setItems(nuevosItems)
  }

  return (
    <div className="container">
      <h1>🎮 Steam Progress Tracker</h1>

      <FormularioItem agregarItem={agregarItem} />

      <ListaItems
        items={items}
        eliminarItem={eliminarItem}
      />
    </div>
  )
}

export default App
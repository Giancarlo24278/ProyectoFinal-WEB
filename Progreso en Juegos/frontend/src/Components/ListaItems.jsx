import ItemCard from './ItemCard'

function ListaItems({ items, eliminarItem }) {
  return (
    <div className="lista">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEliminar={eliminarItem}
        />
      ))}
    </div>
  )
}
export default ListaItems

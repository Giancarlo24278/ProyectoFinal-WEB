import ItemCard from './ItemCard'

function ListaItems({
  items,
  onEliminar,
  onCambiarEstado,
}) {
  return (
    <div className="lista">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEliminar={onEliminar}
          onCambiarEstado={onCambiarEstado}
        />
      ))}
    </div>
  )
}

export default ListaItems
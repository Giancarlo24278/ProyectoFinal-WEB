export const obtenerItems = () => {
  return JSON.parse(localStorage.getItem('items') || '[]')
}

export const guardarItems = (items) => {
  localStorage.setItem('items', JSON.stringify(items))
}
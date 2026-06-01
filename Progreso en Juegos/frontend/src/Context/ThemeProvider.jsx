import {
  createContext
} from 'react'

import { useLocalStorage }
from '../hooks/useLocalStorage'

export const ThemeContext =
  createContext()

export function ThemeProvider({
  children,
}) {
  const [tema, setTema] =
    useLocalStorage(
      'tema',
      'oscuro'
    )

  const toggleTema = () => {
    setTema((prev) =>
      prev === 'oscuro'
        ? 'claro'
        : 'oscuro'
    )
  }

  document.body.setAttribute(
    'data-theme',
    tema
  )

  return (
    <ThemeContext.Provider
      value={{
        tema,
        toggleTema,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
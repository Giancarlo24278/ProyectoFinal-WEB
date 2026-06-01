# Steam Tracker

Proyecto Final - Sistemas y Tecnologias Web
Universidad del Valle de Guatemala

## URLs del Proyecto

Frontend (Vercel)

```text
https://proyecto-final-qselxni4d-giancarlos-proyectos.vercel.app/
```

Backend (Render)

```text
https://proyectofinal-web-37pz.onrender.com
```

---

## Descripcion

Steam Tracker es una aplicacion web para llevar control personal de videojuegos. Permite registrar juegos, administrar su estado, calcular progreso, visualizar estadisticas y analizar actividad reciente mediante graficas interactivas.

El proyecto fue desarrollado utilizando React, Context API, useReducer, custom hooks y Recharts.

---

## Screenshots

### Modo Claro

<img width="1075" height="1507" alt="image" src="https://github.com/user-attachments/assets/877186e5-13d5-4442-b563-52e2dc7cdf19" />

### Modo Oscuro

<img width="1088" height="1538" alt="Screenshot 2026-05-31 233745" src="https://github.com/user-attachments/assets/b14401a4-f78a-4cd1-be01-ae5e5e3c1bdf" />

### Graficas

<img width="2332" height="1263" alt="image" src="https://github.com/user-attachments/assets/6d1e5af6-3b19-445d-b475-fd44887a8afe" />


---

## Stack Tecnologico

| Tecnologia  | Version    |
| ----------- | ---------- |
| React       | 19         |
| Vite        | 7          |
| JavaScript  | ES6+       |
| Context API | React      |
| useReducer  | React      |
| Recharts    | 3          |
| Node.js     | 22         |
| Express     | 5          |
| Render      | Produccion |
| Vercel      | Produccion |

---

## Como ejecutar localmente

### Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
cd ProyectoFinal-Web
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Variables de entorno:

```env
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Variables de entorno:

```env
VITE_API_URL=http://localhost:3001
```

---

## Mis primeros items (Fase 1)

Los primeros juegos utilizados para construir el proyecto fueron:

* Monster Hunter Wilds
* Slay the Spire 
* SOMA

Estos juegos fueron seleccionados porque representan distintos estilos y tiempos de juego, permitiendo probar mejor las funcionalidades de seguimiento y progreso.

---

## Mi paleta de colores (Fase 2)

### Tema Claro

| Variable   | Color   | Justificacion                                                                                                                                                                              |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fondo      | #f7f7f8 | Steam realmente no posee un modo claro oficial, asi que tome inspiracion de algunos conceptos creados por la comunidad para imaginar como podria verse una version clara de la plataforma. |
| Superficie | #ffffff | Utilice blanco para mantener una apariencia limpia y moderna en formularios, tarjetas y paneles.                                                                                           |
| Texto      | #1a1a1a | Escogi un color oscuro para generar suficiente contraste sobre fondos claros y facilitar la lectura.                                                                                       |
| Acento     | #22c55e | Steam utiliza botones verdes para acciones importantes como comprar o instalar juegos, por lo que decidi conservar esa identidad visual.                                                   |
| Borde      | #d1d5db | Es una inversion del estilo de bordes utilizado en Steam oscuro y ayuda a separar visualmente los componentes.                                                                             |

---

## Grafica original y decisiones tecnicas (Fase 3)

### Grafica original

La grafica original muestra el progreso promedio por categoria de videojuegos.

Esta visualizacion permite identificar rapidamente que categorias tienen un mayor porcentaje de avance y cuales requieren mas tiempo para completarse.

### Decisiones tecnicas

1. Utilizar Context API para evitar prop drilling entre componentes.
2. Implementar useMemo para evitar recalculos innecesarios en las graficas.
3. Mantener una separacion clara entre logica de estado y componentes visuales.

---

## Performance (React Profiler)

Durante las pruebas se analizaron renderizados utilizando React Profiler.

### Antes

Se observaban recalculos frecuentes en filtros y estadisticas.

### Despues

Con useMemo y useCallback se redujeron renderizados innecesarios y mejoro la experiencia general de uso.

Agregar capturas del Profiler aqui.

---

## Custom Hooks utilizados

| Hook             | Archivo                       | Funcion                             |
| ---------------- | ----------------------------- | ----------------------------------- |
| useLocalStorage  | src/hooks/useLocalStorage.js  | Persistencia en localStorage        |
| useFetch         | src/hooks/useFetch.js         | Consumo de API con AbortController  |
| useAtajoTeclado  | src/hooks/useAtajoTeclado.js  | Manejo de atajos de teclado         |
| useProgresoJuego | src/hooks/useProgresoJuego.js | Calculo de estadisticas de progreso |

Estos hooks permitieron encapsular logica reutilizable y mantener componentes mas limpios.

---

## Arquitectura General

```text
src/
│
├── components/
├── context/
├── hooks/
├── reducers/
├── services/
├── utils/
│
├── App.jsx
└── main.jsx
```

La aplicacion sigue una arquitectura basada en componentes reutilizables y manejo centralizado de estado mediante Context API y useReducer.

---

## Lo que aprendi

Este proyecto me permitio practicar conceptos importantes de React como Context API, useReducer, optimizacion con useMemo y useCallback, custom hooks y despliegue de aplicaciones completas utilizando Vercel y Render.

Tambien aprendi a estructurar mejor proyectos frontend y backend, asi como a documentar y presentar una aplicacion de manera profesional.

---

## Autor

**Nombre:** Giancarlo Sagastume Guevara

**Universidad:** Universidad del Valle de Guatemala

**Curso:** Sistemas y Tecnologias Web

**Semestre:** 2026

Este proyecto representa la integracion de los temas vistos durante el curso y fue desarrollado progresivamente a traves de las distintas fases del proyecto final.

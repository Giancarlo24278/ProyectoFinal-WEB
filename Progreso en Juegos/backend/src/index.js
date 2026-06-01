const express = require('express')
const cors = require('cors')

const itemsRoutes = require('./Routes/items')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL
}))

app.use(express.json())

app.use('/api/items', itemsRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
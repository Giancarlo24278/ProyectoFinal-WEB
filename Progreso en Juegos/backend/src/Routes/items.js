const express = require('express')
const router = express.Router()

const db = require('../db/database')

/*
GET /api/items
*/
router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM items WHERE activo = 1',
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      const items = rows.map((item) => ({
        ...item,
        atributos: JSON.parse(item.atributos)
      }))

      res.json(items)
    }
  )
})

/*
POST /api/items
*/
router.post('/', (req, res) => {
  const item = req.body

  db.run(
    `
    INSERT INTO items (
      id,
      nombre,
      categoriaId,
      estado,
      puntuacion,
      fechaRegistro,
      fechaActividad,
      notas,
      atributos,
      activo
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      item.id,
      item.nombre,
      item.categoriaId,
      item.estado,
      item.puntuacion,
      item.fechaRegistro,
      item.fechaActividad,
      item.notas,
      JSON.stringify(item.atributos),
      item.activo ? 1 : 0
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.status(201).json(item)
    }
  )
})

/*
PUT /api/items/:id
*/
router.put('/:id', (req, res) => {
  const item = req.body
  const { id } = req.params

  db.run(
    `
    UPDATE items
    SET
      nombre = ?,
      categoriaId = ?,
      estado = ?,
      puntuacion = ?,
      fechaActividad = ?,
      notas = ?,
      atributos = ?
    WHERE id = ?
    `,
    [
      item.nombre,
      item.categoriaId,
      item.estado,
      item.puntuacion,
      item.fechaActividad,
      item.notas,
      JSON.stringify(item.atributos),
      id
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.json({
        mensaje: 'Item actualizado'
      })
    }
  )
})

/*
DELETE /api/items/:id
Archivar
*/
router.delete('/:id', (req, res) => {
  const { id } = req.params

  db.run(
    `
    UPDATE items
    SET activo = 0
    WHERE id = ?
    `,
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.json({
        mensaje: 'Item archivado'
      })
    }
  )
})

/*
POST /api/items/:id/registro
*/
router.post('/:id/registro', (req, res) => {
  const { id } = req.params

  const registro = {
    id: crypto.randomUUID(),
    itemId: id,
    fecha: new Date().toISOString(),
    valor: req.body.valor,
    notas: req.body.notas
  }

  db.run(
    `
    INSERT INTO registros (
      id,
      itemId,
      fecha,
      valor,
      notas
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      registro.id,
      registro.itemId,
      registro.fecha,
      registro.valor,
      registro.notas
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          error: err.message
        })
      }

      res.status(201).json(registro)
    }
  )
})

module.exports = router
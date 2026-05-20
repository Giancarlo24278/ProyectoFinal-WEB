const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.sqlite')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      categoriaId TEXT,
      estado TEXT,
      puntuacion REAL,
      fechaRegistro TEXT,
      fechaActividad TEXT,
      notas TEXT,
      atributos TEXT,
      activo INTEGER
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS registros (
      id TEXT PRIMARY KEY,
      itemId TEXT,
      fecha TEXT,
      valor REAL,
      notas TEXT
    )
  `)
})

module.exports = db
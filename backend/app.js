import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import equipoRoutes    from './src/routes/equipos.routes.js'
import categoriaRoutes from './src/routes/categorias.routes.js'
// import solicitudRoutes from './src/routes/solicitudes.routes.js'

module.exports = app;

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/equipos',    equipoRoutes)
app.use('/api/categorias', categoriaRoutes)
// app.use('/api/solicitudes', solicitudRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
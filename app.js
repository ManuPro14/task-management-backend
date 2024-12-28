const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./utils/swagger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Tareas de la app de ManuBarrios');
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/tasks', taskRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manejo de errores generales
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Error interno del servidor' });
});

module.exports = app;
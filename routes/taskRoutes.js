const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
} = require('../middlewares/validators');
const { validationResult } = require('express-validator');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Rutas CRUD
router.get('/', getTasks);

router.get('/:id', validateTaskId, handleValidationErrors, getTaskById);

router.post('/', validateCreateTask, handleValidationErrors, createTask);

router.put('/:id', validateTaskId, validateUpdateTask, handleValidationErrors, updateTask);

router.delete('/:id', validateTaskId, handleValidationErrors, deleteTask);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: ID único de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         description:
 *           type: string
 *           description: Descripción de la tarea (opcional)
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea (true o false)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 *       required:
 *         - title
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *         description: Filtra tareas por estado (true o false)
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID único de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 */
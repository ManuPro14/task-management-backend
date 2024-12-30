const { body, param } = require('express-validator');

// Validación para crear una tarea
const validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isString()
    .withMessage('El título debe ser un texto'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
];

// Validación para actualizar una tarea
const validateUpdateTask = [
  body('title')
    .optional()
    .isString()
    .withMessage('El título debe ser un texto'),
  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
  body('status')
    .optional()
    .isBoolean()
    .withMessage('El estado debe ser un valor booleano'),
];

// Validación para el `id` en rutas
const validateTaskId = [
  param('id')
    .isNumeric()
    .withMessage('El id debe ser un número'),
];

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
};
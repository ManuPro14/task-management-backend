const {body,param}= require('express-validator');

//validación para creear una tarea
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
]

//validacón para actualizar una tarea
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
    .withMessage('El estado debe ser un valor booleano') 
]

//validación para id en rutas
const validateTaskId = [
  param('id')
    .isMongoId()
    .withMessage('El id no es válido')
]

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId
}

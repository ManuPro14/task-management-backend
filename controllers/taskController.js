const Task = require('../models/taskModel');
const { CustomError } = require('../middlewares/errorHandler');

// Obtener todas las tareas
exports.getTasks = async (req, res, next) => {
  console.log('Ejecutando controlador GET /api/tasks');
  try {
    const tasks = await Task.find();
    console.log('Tareas obtenidas:', tasks);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error en GET /api/tasks:', error);
    next(error);
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    next(new CustomError('Error al obtener la tarea', error.status || 500));
  }
};

// Crear una tarea
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(new CustomError('Error al crear la tarea', error.status || 500));
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error) {
    next(new CustomError('Error al actualizar la tarea', error.status || 500));
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    next(new CustomError('Error al eliminar la tarea', error.status || 500));
  }
};
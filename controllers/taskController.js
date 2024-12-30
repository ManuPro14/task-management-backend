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
    const { id } = req.params;
    console.log("ID recibido:", id);

    const task = await Task.findOne({ id }); 
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error al obtener la tarea:", error);
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
    console.error('Error al crear la tarea:', error);
    next(new CustomError('Error al crear la tarea', error.status || 500));
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res, next) => {
  try {
    const allowedUpdates = ['title', 'description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every((key) => allowedUpdates.includes(key));

    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Actualización no válida' });
    }

    const task = await Task.findOneAndUpdate(
      { id: req.params.id }, 
      { $set: req.body },
      { new: true } 
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    next(new CustomError('Error al actualizar la tarea', 500));
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID no proporcionado' });
    }

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    next(new CustomError('Error al eliminar la tarea', error.status || 500));
  }
};
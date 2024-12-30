const mongoose = require('mongoose');

// Esquema para manejar el contador del ID
const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Counter = mongoose.model('Counter', counterSchema);

// Esquema de la tarea
const taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware para generar automáticamente el ID
taskSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'taskId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Task', taskSchema);
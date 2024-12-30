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
    default: 1,
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
  if (!this.id) {
    const lastTask = await mongoose.model('Task').findOne().sort({ id: -1 });
    this.id = lastTask ? lastTask.id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
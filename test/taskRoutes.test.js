const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Task API Endpoints', () => {
  it('Debería obtener todas las tareas', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Debería crear una nueva tarea', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Nueva tarea', description: 'Descripción de prueba' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('title', 'Nueva tarea');
  });
});
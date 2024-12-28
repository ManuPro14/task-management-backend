const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
  });
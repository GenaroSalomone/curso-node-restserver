
require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

const express = require('express');
const app = express();

server.listen();

// Configuración de CORS
app.use((req, res, next) => {
    // Permite solicitudes desde cualquier origen (no recomendado en producción)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Configura los métodos HTTP permitidos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Configura las cabeceras permitidas
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Permite que las solicitudes de tipo OPTIONS pasen sin ser bloqueadas
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }

    next();
  });

# Task Management API

> **Backend desarrollado en Node.js para la gestión de tareas.** Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre tareas. Está diseñado para ser escalable y fácil de usar, ideal para integrarse con un frontend o aplicaciones móviles.

---

## Índice

1. [Características](#características)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Uso](#uso)
5. [Documentación de la API](#documentación-de-la-api)
6. [Pruebas](#pruebas)
7. [Despliegue](#despliegue)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

---

## Características

- CRUD completo para gestionar tareas.
- Uso de **MongoDB Atlas** como base de datos principal.
- Validación de datos con **express-validator**.
- Documentación interactiva con **Swagger**.
- Preparado para producción con despliegue en **Render**.
- Pruebas automatizadas utilizando **Jest** y **Supertest**.
- Código modular y escalable.

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express.js**: Framework minimalista para construir APIs.
- **MongoDB/Mongoose**: Base de datos NoSQL y ORM para modelar datos.
- **Swagger**: Documentación de la API.
- **Jest & Supertest**: Framework de pruebas.
- **Render**: Plataforma de despliegue.

---

## Instalación y Configuración

### Requisitos Previos

- **Node.js**: >=16.x
- **npm**: >=8.x
- **MongoDB Atlas** o servidor local de MongoDB.
- Cuenta en **Render** (o cualquier servicio de despliegue alternativo).

### Clonar el Repositorio

```bash
git clone [https://github.com/ManuPro14/task-management-backend/new/main](https://github.com/ManuPro14/task-management-backend)
cd task-management-backend
```

## Instalación de dependencias
npm install

## Configuración de variables de entorno

Crea un archivo en la raiz del proyecto clonado .env

MONGO_URI ---> se encuentra subido en Render
PORT ---> 3000

## Ejecutar entorno de desarrollo

npm run dev

## Endpoints Principales
GET | /api/tasks| Obtiene todas las tareas
GET | /api/tasks/:id| Obtiene una tarea por el id
POST | /api/tasks| Crear una nueva tarea
PUT | /api/tasks/:id| Actualiza tarea por id
DELETE | /api/tasks/:id| Elimina una tarea por id

## Documentación de la api

La documentación interactiva está disponible en Swagger

URL ---> https://task-management-backend-qult.onrender.com/api-docs/

Desde esta interfaz se puede explorar los endpoints.

## Pruebas

El proyecto cuenta con pruebas unitarias automatizadas con Jest y Supertest

npm run test

## LICENCIA

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente. 

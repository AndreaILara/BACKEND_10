# Backend: Proyecto de Gestión de Eventos

Este repositorio contiene el backend de un proyecto de gestión de eventos desarrollado en Node.js con Express y MongoDB. El backend gestiona usuarios, eventos y juegos de mesa, proporcionando una API que puede integrarse con un frontend.

El backend está actualmente desplegado en **Vercel**, facilitando su uso en producción.

---

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework minimalista para crear aplicaciones web y APIs.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios, eventos y juegos.
- **Mongoose**: ODM para modelar los datos en MongoDB.
- **Vercel**: Plataforma utilizada para el despliegue del backend.

---

## Instalación y configuración

### Requisitos previos

Asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js v14 o superior.
- MongoDB.
- Un gestor de paquetes como npm o yarn.

### Pasos para instalar

1. Clona este repositorio:

   ```bash
   git clone https://github.com/AndreaILara/BACKEND.git
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd BACKEND
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/nombre_de_tu_base_de_datos
   JWT_SECRET=tu_token_secreto
   CLOUDINARY_URL=tu_url_de_cloudinary (si usas Cloudinary para imágenes)
   ```

5. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:3000`.

---

## Endpoints disponibles

### Autenticación

- **POST /api/v2/auth/register**: Registrar un nuevo usuario.
- **POST /api/v2/auth/login**: Iniciar sesión y obtener un token JWT.

### Usuarios

- **GET /api/v2/users**: Obtener una lista de usuarios.
- **GET /api/v2/users/:id**: Obtener un usuario por ID.
- **PUT /api/v2/users/:id**: Actualizar información de un usuario.
- **DELETE /api/v2/users/:id**: Eliminar un usuario.

### Eventos

- **GET /api/v2/events**: Listar todos los eventos.
- **POST /api/v2/events**: Crear un nuevo evento.
- **PUT /api/v2/events/:id**: Actualizar un evento.
- **DELETE /api/v2/events/:id**: Eliminar un evento.

### Juegos de Mesa

- **GET /api/v2/boardgames**: Listar todos los juegos de mesa.
- **POST /api/v2/boardgames**: Agregar un nuevo juego de mesa.
- **DELETE /api/v2/boardgames/:id**: Eliminar un juego de mesa.

---

## Despliegue

El backend está desplegado en **Vercel**, lo que permite acceder a la API de manera eficiente desde cualquier parte del mundo.

Para desplegar este backend en un entorno de producción diferente, puedes usar plataformas como **Render**, **Heroku** o cualquier servidor que soporte Node.js y MongoDB.

---



¡Gracias por tu interés en este proyecto!

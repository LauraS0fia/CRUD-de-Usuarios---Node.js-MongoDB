# CRUD de Usuarios - Node.js & MongoDB

Aplicación web full-stack para gestión de usuarios con operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar). Desarrollada con Node.js, Express, MongoDB y Mongoose.

## Características

- Crear nuevos usuarios con nombre, email y edad
- Listar todos los usuarios registrados
- Editar información de usuarios existentes
- Eliminar usuarios del sistema
- Interfaz responsiva y moderna
- Validación de formularios
- Operaciones asíncronas con feedback visual

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose v9.0.0

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

## Requisitos Previos

- Node.js v20.19.0 o superior
- MongoDB (local o MongoDB Atlas)
- npm (incluido con Node.js)

## Estructura del Proyecto
```
proyecto-crud/
├── server.js           # Servidor Express y rutas API
├── models/
│   └── User.js        # Modelo de usuario con Mongoose
├── public/
│   ├── index.html     # Interfaz de usuario
│   ├── app.js         # Lógica del cliente
│   └── styles.css     # Estilos de la aplicación
├── package.json
└── package-lock.json
```

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/crud-usuarios.git
cd crud-usuarios
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar la conexión a MongoDB:

Editar el archivo `server.js` y actualizar la cadena de conexión:
```javascript
mongoose.connect('mongodb://localhost:27017/crud-usuarios');
```

Para MongoDB Atlas:
```javascript
mongoose.connect('mongodb+srv://usuario:password@cluster.mongodb.net/crud-usuarios');
```

4. Iniciar el servidor:
```bash
node server.js
```

5. Abrir el navegador en:
```
http://localhost:3000
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| POST | `/api/users` | Crear un nuevo usuario |
| PUT | `/api/users/:id` | Actualizar un usuario existente |
| DELETE | `/api/users/:id` | Eliminar un usuario |

## Modelo de Datos
```javascript
{
  name: String,    // Nombre del usuario
  email: String,   // Correo electrónico
  age: Number      // Edad
}
```

## Uso

1. **Crear usuario**: Completar el formulario con nombre, email y edad, luego hacer clic en "Guardar".

2. **Editar usuario**: Hacer clic en el botón "Editar" de la fila correspondiente. El formulario se llenará automáticamente con los datos del usuario. Modificar los campos necesarios y hacer clic en "Actualizar".

3. **Eliminar usuario**: Hacer clic en el botón "Eliminar" de la fila correspondiente. Se mostrará una confirmación antes de eliminar.

## Scripts Disponibles
```bash
# Instalar dependencias
npm install

# Iniciar servidor en modo desarrollo
node server.js

# Iniciar servidor con nodemon (requiere instalación)
npm install -g nodemon
nodemon server.js
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crud-usuarios
```

Instalar dotenv:
```bash
npm install dotenv
```

Actualizar `server.js`:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI);
```

## Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request


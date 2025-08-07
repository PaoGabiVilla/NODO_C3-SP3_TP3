import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';

import methodOverride from 'method-override';
import session from 'express-session';

const app = express();
//Esto es para el mensaje provisorio :o
app.use(session({
  secret: 'clave-secreta', // poné algo más seguro en producción
  resave: false,
  saveUninitialized: true
}));

const PORT = process.env.PORT || 3000;
// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

// Middleware para parsear JSON - para leer JSON
app.use(express.json());


app.use(express.urlencoded({ extended: true })); // 👈 este va después de express.json()

// Conexión a MongoDB
connectDB();

app.use(methodOverride('_method'));

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});

//Configuración EJS como motor de vistas en Express
app.set('view engine', 'ejs');

// Establecer la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


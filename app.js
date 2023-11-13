import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js'; 
import userRoute from './routes/userRoute.js';
import connectDB from './database/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' assert { type: 'json' };

const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json()); 

// Configuration de express-session
app.use(session({
    secret: 'votre_clé_secrète',
    resave: false,
    saveUninitialized: true
}));

// Routes d'authentification
app.use('/auth', authRoute);

// Routes administrateur  
//app.use('/admin', adminRoute);
app.use('/users', adminRoute);

// Routes utilisateur
app.use('/user', userRoute);

// Middleware Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'application');
});

// Port d'écoute
const port = process.env.PORT || 5002;

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

connectDB();
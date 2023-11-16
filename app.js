import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import authRoute from './routes/authRoute.js';
import adminRoute from './routes/adminRoute.js'; 
import userRoute from './routes/userRoute.js';
import talentRoute from './routes/talentRoute.js';
import { soumettreDemande, demanderChangementRole, accepterChangementRole, refuserChangementRole } from './Controller/demandechangeroleController.js';
import connectDB from './database/db.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger.json' assert { type: 'json' };
import fetch from 'node-fetch';

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/talent', talentRoute);
app.use('/demandechangementrole', soumettreDemande, demanderChangementRole, accepterChangementRole, refuserChangementRole); // Utilisez les fonctions middleware individuelles

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the application');
});

// Fetch Swagger data
const fetchSwaggerData = async () => {
    try {
      const response = await fetch('http://localhost:5002', {
        mode: 'cors',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorText = await response.text();
        throw new Error(`Error fetching Swagger data: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
    }
};

// Server setup
const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Connect to database
connectDB();
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 

const app = express();
const port = 8080;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./kurokoserver-3156e-firebase-adminsdk-2btbq-8d275f6b6b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Import route handlers
const authRoutes = require('./routes/authRoute');
const authorsRoutes = require('./routes/authorsRoute'); 
const charactersRoutes = require('./routes/charactersRoute');
const newsRoutes = require('./routes/newsRoute');
const commentRoutes = require('./routes/commentRoute');
const eventsRoutes = require('./routes/eventsRoute');

// Set up routes
app.use('/auth', authRoutes);
app.use('/authors', authorsRoutes); 
app.use('/characters', charactersRoutes);
app.use('/news', newsRoutes);
app.use('/comments', commentRoutes); 
app.use('/events', eventsRoutes);

// Добавление маршрута для отображения документации Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

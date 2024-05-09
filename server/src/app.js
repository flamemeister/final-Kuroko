const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const port = 8080;

app.use(bodyParser.json());

const serviceAccount = require('./kurokoserver-3156e-firebase-adminsdk-2btbq-8d275f6b6b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authRoutes = require('./routes/authRoute');
const authorsRoutes = require('./routes/authorsRoute'); 
const charactersRoutes = require('./routes/charactersRoute');
const newsRoutes = require('./routes/newsRoute');
const commentRoutes = require('./routes/commentRoute');
const eventsRoutes = require('./routes/eventsRoute')

app.use('/auth', authRoutes);
app.use('/authors', authorsRoutes); 
app.use('/characters', charactersRoutes);
app.use('/news', newsRoutes);
app.use('/comments', commentRoutes); 
app.use('/events', eventsRoutes); 


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

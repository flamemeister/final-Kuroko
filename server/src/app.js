const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
const port = 8080;

app.use(bodyParser.json());

const serviceAccount = require('./kurokoserver-3156e-firebase-adminsdk-2btbq-8d275f6b6b');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authRoutes = require('./routes/authRoute');
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

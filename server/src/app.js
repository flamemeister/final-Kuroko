const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 
const { sequelize } = require('./models/LocalNews'); // Добавлен импорт для инициализации базы данных SQLite
const { LocalNews } = require('./models/LocalNews'); // Добавлен импорт модели LocalNews

const app = express();
const port = 8080;

app.use(bodyParser.json());

// Инициализация подключения к Firebase Firestore
const serviceAccount = require('./kurokoserver-3156e-firebase-adminsdk-2btbq-8d275f6b6b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Создание таблиц в базе данных SQLite
sequelize.sync().then(() => {
  console.log('Database & tables created!');
  // Вызываем функцию для миграции данных после создания таблиц
  migrateData();
});

// Функция для миграции данных из Firebase Firestore в локальную базу данных SQLite
async function migrateData() {
  try {
    // Получаем данные из Firebase Firestore
    const snapshot = await admin.firestore().collection('news').get();

    // Проходим по каждому документу и добавляем его в SQLite
    snapshot.forEach(doc => {
      const data = doc.data();
      LocalNews.create({
        title: data.title,
        photoUrl: data.photoUrl,
        mainText: data.mainText
      });
    });

    console.log('Data migration completed successfully.');
  } catch (error) {
    console.error('Error migrating data:', error);
  }
}

// Импорт маршрутов
const authRoutes = require('./routes/authRoute');
const authorsRoutes = require('./routes/authorsRoute'); 
const charactersRoutes = require('./routes/charactersRoute');
const newsRoutes = require('./routes/newsRoute');
const commentRoutes = require('./routes/commentRoute');
const eventsRoutes = require('./routes/eventsRoute');

// Установка маршрутов
app.use('/auth', authRoutes);
app.use('/authors', authorsRoutes); 
app.use('/characters', charactersRoutes);
app.use('/news', newsRoutes);
app.use('/comments', commentRoutes); 
app.use('/events', eventsRoutes);

// Добавление маршрута для отображения документации Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Запуск сервера и прослушивание указанного порта
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

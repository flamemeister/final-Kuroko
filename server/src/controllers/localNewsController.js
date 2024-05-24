const { LocalNews } = require('../models/LocalNews');
const { logError, logInfo } = require('../logger');

exports.saveNewsToLocal = async (req, res) => {
  try {
    const { title, photoUrl, mainText } = req.body;
    const news = await LocalNews.create({ title, photoUrl, mainText });
    logInfo('News saved to local database successfully');
    res.status(201).json(news);
  } catch (error) {
    logError('Error saving news to local database:', error);
    res.status(500).json({ error: 'Failed to save news to local database' });
  }
};

exports.getLocalNews = async (req, res) => {
  try {
    const news = await LocalNews.findAll();
    logInfo('Retrieved all local news successfully');
    res.status(200).json(news);
  } catch (error) {
    logError('Error getting local news:', error);
    res.status(500).json({ error: 'Failed to get local news' });
  }
};

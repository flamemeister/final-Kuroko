const admin = require('firebase-admin');
const db = admin.firestore();
const News = require('../models/News');

exports.createNews = async (req, res) => {
  try {
    const { title, photoUrl, mainText } = req.body;
    const newsData = { title, photoUrl, mainText };
    const newsRef = await db.collection('news').add(newsData);
    res.status(201).json({ id: newsRef.id });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news' });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const snapshot = await db.collection('news').get();
    const news = [];
    snapshot.forEach(doc => {
      news.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(news);
  } catch (error) {
    console.error('Error getting news:', error);
    res.status(500).json({ error: 'Failed to get news' });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('news').doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'News not found' });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error getting news by ID:', error);
    res.status(500).json({ error: 'Failed to get news by ID' });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, photoUrl, mainText } = req.body;
    const newData = { title, photoUrl, mainText };
    await db.collection('news').doc(id).update(newData);
    res.status(200).json({ message: 'News updated successfully' });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('news').doc(id).delete();
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
};
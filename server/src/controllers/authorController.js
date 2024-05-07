// authorController.js
const admin = require('firebase-admin');
const db = admin.firestore();

exports.createAuthor = async (req, res) => {
  try {
    const { name, age, role, description } = req.body;
    const authorData = { name, age, role, description };
    const authorRef = await db.collection('authors').add(authorData);
    res.status(201).json({ id: authorRef.id });
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Failed to create author' });
  }
};

exports.getAllAuthors = async (req, res) => {
  try {
    const snapshot = await db.collection('authors').get();
    const authors = [];
    snapshot.forEach(doc => {
      authors.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(authors);
  } catch (error) {
    console.error('Error getting authors:', error);
    res.status(500).json({ error: 'Failed to get authors' });
  }
};

// Получение автора по ID
exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('authors').doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Author not found' });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error getting author by ID:', error);
    res.status(500).json({ error: 'Failed to get author by ID' });
  }
};

// Обновление автора
exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, role, description } = req.body;
    const newData = { name, age, role, description };
    await db.collection('authors').doc(id).update(newData);
    res.status(200).json({ message: 'Author updated successfully' });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Failed to update author' });
  }
};

// Удаление автора
exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('authors').doc(id).delete();
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

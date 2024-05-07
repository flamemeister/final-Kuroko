const admin = require('firebase-admin');
const db = admin.firestore();
const Character = require('../models/Character');

exports.createCharacter = async (req, res) => {
  try {
    const { name, age, description, imageUrl, skill } = req.body;
    const characterData = { name, age, description, imageUrl, skill }; // Создаем обычный JavaScript объект
    const characterRef = await db.collection('characters').add(characterData);
    res.status(201).json({ id: characterRef.id });
  } catch (error) {
    console.error('Error creating character:', error);
    res.status(500).json({ error: 'Failed to create character' });
  }
};

exports.getAllCharacters = async (req, res) => {
  try {
    const snapshot = await db.collection('characters').get();
    const characters = [];
    snapshot.forEach(doc => {
      characters.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(characters);
  } catch (error) {
    console.error('Error getting characters:', error);
    res.status(500).json({ error: 'Failed to get characters' });
  }
};

exports.getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('characters').doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Character not found' });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error getting character by ID:', error);
    res.status(500).json({ error: 'Failed to get character by ID' });
  }
};

exports.updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, description, imageUrl, skill } = req.body;
    const newData = { name, age, description, imageUrl, skill };
    await db.collection('characters').doc(id).update(newData);
    res.status(200).json({ message: 'Character updated successfully' });
  } catch (error) {
    console.error('Error updating character:', error);
    res.status(500).json({ error: 'Failed to update character' });
  }
};

exports.deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('characters').doc(id).delete();
    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    console.error('Error deleting character:', error);
    res.status(500).json({ error: 'Failed to delete character' });
  }
};

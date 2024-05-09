/**
 * @file This file defines the controller functions for character-related operations.
 * @description This file contains functions to handle creating, retrieving, updating, and deleting characters.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 const Character = require('../models/Character');
 const { logError, logInfo } = require('../logger');
 
 /**
  * Create a new character.
  * @function createCharacter
  * @param {Object} req - The request object.
  * @param {Object} req.body - The request body containing the character data.
  * @param {string} req.body.name - The name of the character.
  * @param {number} req.body.age - The age of the character.
  * @param {string} req.body.description - The description of the character.
  * @param {string} req.body.imageUrl - The URL of the character's image.
  * @param {string} req.body.skill - The skill of the character.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.createCharacter = async (req, res) => {
   try {
     const { name, age, description, imageUrl, skill } = req.body;
     const characterData = { name, age, description, imageUrl, skill };
     const characterRef = await db.collection('characters').add(characterData);
     logInfo('Character created successfully'); // Log success
     res.status(201).json({ id: characterRef.id });
   } catch (error) {
     logError('Error creating character:', error); // Log error
     res.status(500).json({ error: 'Failed to create character' });
   }
 };
 
 /**
  * Get all characters.
  * @function getAllCharacters
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getAllCharacters = async (req, res) => {
   try {
     const snapshot = await db.collection('characters').get();
     const characters = [];
     snapshot.forEach(doc => {
       characters.push({ id: doc.id, ...doc.data() });
     });
     logInfo('Retrieved all characters successfully'); // Log success
     res.status(200).json(characters);
   } catch (error) {
     logError('Error getting characters:', error); // Log error
     res.status(500).json({ error: 'Failed to get characters' });
   }
 };
 
 /**
  * Get a character by ID.
  * @function getCharacterById
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the character to retrieve.
  * @param {Object} res - The response object.
  * @returns {void}
  */
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
     logError('Error getting character by ID:', error); // Log error
     res.status(500).json({ error: 'Failed to get character by ID' });
   }
 };
 
 /**
  * Update a character.
  * @function updateCharacter
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the character to update.
  * @param {Object} req.body - The request body containing the updated character data.
  * @param {string} req.body.name - The updated name of the character.
  * @param {number} req.body.age - The updated age of the character.
  * @param {string} req.body.description - The updated description of the character.
  * @param {string} req.body.imageUrl - The updated URL of the character's image.
  * @param {string} req.body.skill - The updated skill of the character.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.updateCharacter = async (req, res) => {
   try {
     const { id } = req.params;
     const { name, age, description, imageUrl, skill } = req.body;
     const newData = { name, age, description, imageUrl, skill };
     await db.collection('characters').doc(id).update(newData);
     logInfo('Character updated successfully'); // Log success
     res.status(200).json({ message: 'Character updated successfully' });
   } catch (error) {
     logError('Error updating character:', error); // Log error
     res.status(500).json({ error: 'Failed to update character' });
   }
 };
 
 /**
  * Delete a character.
  * @function deleteCharacter
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the character to delete.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.deleteCharacter = async (req, res) => {
   try {
     const { id } = req.params;
     await db.collection('characters').doc(id).delete();
     logInfo('Character deleted successfully'); // Log success
     res.status(200).json({ message: 'Character deleted successfully' });
   } catch (error) {
     logError('Error deleting character:', error); // Log error
     res.status(500).json({ error: 'Failed to delete character' });
   }
 };
 
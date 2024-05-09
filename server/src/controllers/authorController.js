/**
 * @file This file defines the controller functions for author-related operations.
 * @description This file contains functions to handle creating, retrieving, updating, and deleting authors.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 const { logError, logInfo } = require('../logger');
 
 /**
  * Create a new author.
  * @function createAuthor
  * @param {Object} req - The request object.
  * @param {Object} req.body - The request body containing the author data.
  * @param {string} req.body.name - The name of the author.
  * @param {number} req.body.age - The age of the author.
  * @param {string} req.body.role - The role of the author.
  * @param {string} req.body.description - The description of the author.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.createAuthor = async (req, res) => {
   try {
     const { name, age, role, description } = req.body;
     const authorData = { name, age, role, description };
     const authorRef = await db.collection('authors').add(authorData);
     logInfo('Author created successfully'); // Log success
     res.status(201).json({ id: authorRef.id });
   } catch (error) {
     logError('Error creating author:', error); // Log error
     res.status(500).json({ error: 'Failed to create author' });
   }
 };
 
 /**
  * Get all authors.
  * @function getAllAuthors
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getAllAuthors = async (req, res) => {
   try {
     const snapshot = await db.collection('authors').get();
     const authors = [];
     snapshot.forEach(doc => {
       authors.push({ id: doc.id, ...doc.data() });
     });
     logInfo('Retrieved all authors successfully'); // Log success
     res.status(200).json(authors);
   } catch (error) {
     logError('Error getting authors:', error); // Log error
     res.status(500).json({ error: 'Failed to get authors' });
   }
 };
 
 /**
  * Get an author by ID.
  * @function getAuthorById
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the author to retrieve.
  * @param {Object} res - The response object.
  * @returns {void}
  */
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
     logError('Error getting author by ID:', error); // Log error
     res.status(500).json({ error: 'Failed to get author by ID' });
   }
 };
 
 /**
  * Update an author.
  * @function updateAuthor
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the author to update.
  * @param {Object} req.body - The request body containing the updated author data.
  * @param {string} req.body.name - The updated name of the author.
  * @param {number} req.body.age - The updated age of the author.
  * @param {string} req.body.role - The updated role of the author.
  * @param {string} req.body.description - The updated description of the author.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.updateAuthor = async (req, res) => {
   try {
     const { id } = req.params;
     const { name, age, role, description } = req.body;
     const newData = { name, age, role, description };
     await db.collection('authors').doc(id).update(newData);
     logInfo('Author updated successfully'); // Log success
     res.status(200).json({ message: 'Author updated successfully' });
   } catch (error) {
     logError('Error updating author:', error); // Log error
     res.status(500).json({ error: 'Failed to update author' });
   }
 };
 
 /**
  * Delete an author.
  * @function deleteAuthor
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the author to delete.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.deleteAuthor = async (req, res) => {
   try {
     const { id } = req.params;
     await db.collection('authors').doc(id).delete();
     logInfo('Author deleted successfully'); // Log success
     res.status(200).json({ message: 'Author deleted successfully' });
   } catch (error) {
     logError('Error deleting author:', error); // Log error
     res.status(500).json({ error: 'Failed to delete author' });
   }
 };
 
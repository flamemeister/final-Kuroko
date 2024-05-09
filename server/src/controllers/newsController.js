/**
 * @file This file defines the controller functions for news-related operations.
 * @description This file contains functions to handle creating, retrieving, updating, and deleting news articles.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 const News = require('../models/News');
 const { logError, logInfo } = require('../logger');
 
 /**
  * Create a new news article.
  * @function createNews
  * @param {Object} req - The request object.
  * @param {Object} req.body - The request body containing the title, photo URL, and main text of the news article.
  * @param {string} req.body.title - The title of the news article.
  * @param {string} req.body.photoUrl - The URL of the photo associated with the news article.
  * @param {string} req.body.mainText - The main text content of the news article.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.createNews = async (req, res) => {
   try {
     const { title, photoUrl, mainText } = req.body;
     const newsData = { title, photoUrl, mainText };
     const newsRef = await db.collection('news').add(newsData);
     logInfo('News article created successfully'); // Log success
     res.status(201).json({ id: newsRef.id });
   } catch (error) {
     logError('Error creating news:', error); // Log error
     res.status(500).json({ error: 'Failed to create news' });
   }
 };
 
 /**
  * Get all news articles.
  * @function getAllNews
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getAllNews = async (req, res) => {
   try {
     const snapshot = await db.collection('news').get();
     const news = [];
     snapshot.forEach(doc => {
       news.push({ id: doc.id, ...doc.data() });
     });
     logInfo('Retrieved all news articles successfully'); // Log success
     res.status(200).json(news);
   } catch (error) {
     logError('Error getting news:', error); // Log error
     res.status(500).json({ error: 'Failed to get news' });
   }
 };
 
 /**
  * Get a news article by ID.
  * @function getNewsById
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the news article to retrieve.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getNewsById = async (req, res) => {
   try {
     const { id } = req.params;
     const doc = await db.collection('news').doc(id).get();
     if (!doc.exists) {
       res.status(404).json({ error: 'News article not found' });
     } else {
       res.status(200).json({ id: doc.id, ...doc.data() });
     }
   } catch (error) {
     logError('Error getting news by ID:', error); // Log error
     res.status(500).json({ error: 'Failed to get news by ID' });
   }
 };
 
 /**
  * Update a news article.
  * @function updateNews
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the news article to update.
  * @param {Object} req.body - The request body containing the updated title, photo URL, and main text of the news article.
  * @param {string} req.body.title - The updated title of the news article.
  * @param {string} req.body.photoUrl - The updated URL of the photo associated with the news article.
  * @param {string} req.body.mainText - The updated main text content of the news article.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.updateNews = async (req, res) => {
   try {
     const { id } = req.params;
     const { title, photoUrl, mainText } = req.body;
     const newData = { title, photoUrl, mainText };
     await db.collection('news').doc(id).update(newData);
     logInfo('News article updated successfully'); // Log success
     res.status(200).json({ message: 'News article updated successfully' });
   } catch (error) {
     logError('Error updating news:', error); // Log error
     res.status(500).json({ error: 'Failed to update news' });
   }
 };
 
 /**
  * Delete a news article.
  * @function deleteNews
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the news article to delete.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.deleteNews = async (req, res) => {
   try {
     const { id } = req.params;
     await db.collection('news').doc(id).delete();
     logInfo('News article deleted successfully'); // Log success
     res.status(200).json({ message: 'News article deleted successfully' });
   } catch (error) {
     logError('Error deleting news:', error); // Log error
     res.status(500).json({ error: 'Failed to delete news' });
   }
 };
 
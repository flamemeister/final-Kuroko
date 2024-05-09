/**
 * @file This file defines the controller functions for comment-related operations.
 * @description This file contains functions to handle creating, retrieving, updating, and deleting comments.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 const Comment = require('../models/Comment');
 const { logError, logInfo } = require('../logger');
 
 /**
  * Create a new comment.
  * @function createComment
  * @param {Object} req - The request object.
  * @param {Object} req.body - The request body containing the text of the comment.
  * @param {string} req.body.text - The text of the comment.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.createComment = async (req, res) => {
   try {
     const { text } = req.body;
     const commentData = {
       text: text,
     };
     const commentRef = await db.collection('comments').add(commentData);
     logInfo('Comment created successfully'); // Log success
     res.status(201).json({ id: commentRef.id, ...commentData });
   } catch (error) {
     logError('Error creating comment:', error); // Log error
     res.status(500).json({ error: 'Failed to create comment' });
   }
 };
 
 /**
  * Get all comments.
  * @function getAllComments
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getAllComments = async (req, res) => {
   try {
     const snapshot = await db.collection('comments').get();
     const comments = [];
     snapshot.forEach(doc => {
       comments.push({ id: doc.id, ...doc.data() });
     });
     logInfo('Retrieved all comments successfully'); // Log success
     res.status(200).json(comments);
   } catch (error) {
     logError('Error getting comments:', error); // Log error
     res.status(500).json({ error: 'Failed to get comments' });
   }
 };
 
 /**
  * Get a comment by ID.
  * @function getCommentById
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the comment to retrieve.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getCommentById = async (req, res) => {
   try {
     const { id } = req.params;
     const doc = await db.collection('comments').doc(id).get();
     if (!doc.exists) {
       res.status(404).json({ error: 'Comment not found' });
     } else {
       res.status(200).json({ id: doc.id, ...doc.data() });
     }
   } catch (error) {
     logError('Error getting comment by ID:', error); // Log error
     res.status(500).json({ error: 'Failed to get comment by ID' });
   }
 };
 
 /**
  * Update a comment.
  * @function updateComment
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the comment to update.
  * @param {Object} req.body - The request body containing the updated text of the comment.
  * @param {string} req.body.text - The updated text of the comment.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.updateComment = async (req, res) => {
   try {
     const { id } = req.params;
     const { text } = req.body;
     const newData = { text };
     await db.collection('comments').doc(id).update(newData);
     logInfo('Comment updated successfully'); // Log success
     res.status(200).json({ message: 'Comment updated successfully' });
   } catch (error) {
     logError('Error updating comment:', error); // Log error
     res.status(500).json({ error: 'Failed to update comment' });
   }
 };
 
 /**
  * Delete a comment.
  * @function deleteComment
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the comment to delete.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.deleteComment = async (req, res) => {
   try {
     const { id } = req.params;
     await db.collection('comments').doc(id).delete();
     logInfo('Comment deleted successfully'); // Log success
     res.status(200).json({ message: 'Comment deleted successfully' });
   } catch (error) {
     logError('Error deleting comment:', error); // Log error
     res.status(500).json({ error: 'Failed to delete comment' });
   }
 };
 
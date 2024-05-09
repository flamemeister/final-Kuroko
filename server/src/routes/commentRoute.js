/**
 * @file This file defines the routes related to comments.
 * @description This file contains route definitions for creating, retrieving, updating, and deleting comments.
 */

 const express = require('express');
 const router = express.Router();
 const commentController = require('../controllers/commentController');
 
 /**
  * @swagger
  * /comments:
  *   post:
  *     summary: Create a new comment.
  *     description: Endpoint to create a new comment.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Comment'
  *     responses:
  *       201:
  *         description: Successfully created a new comment.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/', commentController.createComment);
 
 /**
  * @swagger
  * /comments:
  *   get:
  *     summary: Get all comments.
  *     description: Endpoint to retrieve all comments.
  *     responses:
  *       200:
  *         description: Successfully retrieved all comments.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/', commentController.getAllComments);
 
 /**
  * @swagger
  * /comments/{id}:
  *   get:
  *     summary: Get a comment by ID.
  *     description: Endpoint to retrieve a comment by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully retrieved the comment.
  *       404:
  *         description: Comment not found.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/:id', commentController.getCommentById);
 
 /**
  * @swagger
  * /comments/{id}:
  *   put:
  *     summary: Update a comment.
  *     description: Endpoint to update a comment.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Comment'
  *     responses:
  *       200:
  *         description: Successfully updated the comment.
  *       500:
  *         description: Internal Server Error.
  */
 router.put('/:id', commentController.updateComment);
 
 /**
  * @swagger
  * /comments/{id}:
  *   delete:
  *     summary: Delete a comment.
  *     description: Endpoint to delete a comment.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully deleted the comment.
  *       500:
  *         description: Internal Server Error.
  */
 router.delete('/:id', commentController.deleteComment);
 
 module.exports = router;
 
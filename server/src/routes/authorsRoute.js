/**
 * @file This file defines the routes related to authors.
 * @description This file contains route definitions for creating, retrieving, updating, and deleting authors.
 */

 const express = require('express');
 const router = express.Router();
 const authorController = require('../controllers/authorController');
 
 /**
  * @swagger
  * /authors:
  *   post:
  *     summary: Create a new author.
  *     description: Endpoint to create a new author.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Author'
  *     responses:
  *       201:
  *         description: Successfully created a new author.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/', authorController.createAuthor);
 
 /**
  * @swagger
  * /authors:
  *   get:
  *     summary: Get all authors.
  *     description: Endpoint to retrieve all authors.
  *     responses:
  *       200:
  *         description: Successfully retrieved all authors.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/', authorController.getAllAuthors);
 
 /**
  * @swagger
  * /authors/{id}:
  *   get:
  *     summary: Get an author by ID.
  *     description: Endpoint to retrieve an author by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully retrieved the author.
  *       404:
  *         description: Author not found.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/:id', authorController.getAuthorById);
 
 /**
  * @swagger
  * /authors/{id}:
  *   put:
  *     summary: Update an author.
  *     description: Endpoint to update an author.
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
  *             $ref: '#/components/schemas/Author'
  *     responses:
  *       200:
  *         description: Successfully updated the author.
  *       500:
  *         description: Internal Server Error.
  */
 router.put('/:id', authorController.updateAuthor);
 
 /**
  * @swagger
  * /authors/{id}:
  *   delete:
  *     summary: Delete an author.
  *     description: Endpoint to delete an author.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully deleted the author.
  *       500:
  *         description: Internal Server Error.
  */
 router.delete('/:id', authorController.deleteAuthor);
 
 module.exports = router;
 
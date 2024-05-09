/**
 * @file This file defines the routes related to news items.
 * @description This file contains route definitions for creating, retrieving, updating, and deleting news items.
 */

 const express = require('express');
 const router = express.Router();
 const newsController = require('../controllers/newsController');
 
 /**
  * @swagger
  * /news:
  *   post:
  *     summary: Create a new news item.
  *     description: Endpoint to create a new news item.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/News'
  *     responses:
  *       201:
  *         description: Successfully created a new news item.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/', newsController.createNews);
 
 /**
  * @swagger
  * /news:
  *   get:
  *     summary: Get all news items.
  *     description: Endpoint to retrieve all news items.
  *     responses:
  *       200:
  *         description: Successfully retrieved all news items.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/', newsController.getAllNews);
 
 /**
  * @swagger
  * /news/{id}:
  *   get:
  *     summary: Get a news item by ID.
  *     description: Endpoint to retrieve a news item by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully retrieved the news item.
  *       404:
  *         description: News item not found.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/:id', newsController.getNewsById);
 
 /**
  * @swagger
  * /news/{id}:
  *   put:
  *     summary: Update a news item.
  *     description: Endpoint to update a news item.
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
  *             $ref: '#/components/schemas/News'
  *     responses:
  *       200:
  *         description: Successfully updated the news item.
  *       500:
  *         description: Internal Server Error.
  */
 router.put('/:id', newsController.updateNews);
 
 /**
  * @swagger
  * /news/{id}:
  *   delete:
  *     summary: Delete a news item.
  *     description: Endpoint to delete a news item.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully deleted the news item.
  *       500:
  *         description: Internal Server Error.
  */
 router.delete('/:id', newsController.deleteNews);
 
 module.exports = router;
 
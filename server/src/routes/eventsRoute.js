/**
 * @file This file defines the routes related to events.
 * @description This file contains route definitions for creating, retrieving, updating, and deleting events.
 */

 const express = require('express');
 const router = express.Router();
 const eventController = require('../controllers/eventController');
 
 /**
  * @swagger
  * /events:
  *   post:
  *     summary: Create a new event.
  *     description: Endpoint to create a new event.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Event'
  *     responses:
  *       201:
  *         description: Successfully created a new event.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/', eventController.createEvent);
 
 /**
  * @swagger
  * /events:
  *   get:
  *     summary: Get all events.
  *     description: Endpoint to retrieve all events.
  *     responses:
  *       200:
  *         description: Successfully retrieved all events.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/', eventController.getAllEvents);
 
 /**
  * @swagger
  * /events/{id}:
  *   get:
  *     summary: Get an event by ID.
  *     description: Endpoint to retrieve an event by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully retrieved the event.
  *       404:
  *         description: Event not found.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/:id', eventController.getEventById);
 
 /**
  * @swagger
  * /events/{id}:
  *   put:
  *     summary: Update an event.
  *     description: Endpoint to update an event.
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
  *             $ref: '#/components/schemas/Event'
  *     responses:
  *       200:
  *         description: Successfully updated the event.
  *       500:
  *         description: Internal Server Error.
  */
 router.put('/:id', eventController.updateEvent);
 
 /**
  * @swagger
  * /events/{id}:
  *   delete:
  *     summary: Delete an event.
  *     description: Endpoint to delete an event.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully deleted the event.
  *       500:
  *         description: Internal Server Error.
  */
 router.delete('/:id', eventController.deleteEvent);
 
 /**
  * @swagger
  * /events/random/get:
  *   get:
  *     summary: Random event.
  *     description: Endpoint to randomly get an event.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully get the event.
  *       500:
  *         description: Internal Server Error.
  */

 router.get('/random/get', eventController.getRandomEvent);

 
 module.exports = router;
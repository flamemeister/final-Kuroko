/**
 * @file This file defines the routes related to characters.
 * @description This file contains route definitions for creating, retrieving, updating, and deleting characters.
 */

 const express = require('express');
 const router = express.Router();
 const characterController = require('../controllers/characterController');
 
 /**
  * @swagger
  * /characters:
  *   post:
  *     summary: Create a new character.
  *     description: Endpoint to create a new character.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/Character'
  *     responses:
  *       201:
  *         description: Successfully created a new character.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/', characterController.createCharacter);
 
 /**
  * @swagger
  * /characters:
  *   get:
  *     summary: Get all characters.
  *     description: Endpoint to retrieve all characters.
  *     responses:
  *       200:
  *         description: Successfully retrieved all characters.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/', characterController.getAllCharacters);
 
 /**
  * @swagger
  * /characters/{id}:
  *   get:
  *     summary: Get a character by ID.
  *     description: Endpoint to retrieve a character by its ID.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully retrieved the character.
  *       404:
  *         description: Character not found.
  *       500:
  *         description: Internal Server Error.
  */
 router.get('/:id', characterController.getCharacterById);
 
 /**
  * @swagger
  * /characters/{id}:
  *   put:
  *     summary: Update a character.
  *     description: Endpoint to update a character.
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
  *             $ref: '#/components/schemas/Character'
  *     responses:
  *       200:
  *         description: Successfully updated the character.
  *       500:
  *         description: Internal Server Error.
  */
 router.put('/:id', characterController.updateCharacter);
 
 /**
  * @swagger
  * /characters/{id}:
  *   delete:
  *     summary: Delete a character.
  *     description: Endpoint to delete a character.
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         description: Successfully deleted the character.
  *       500:
  *         description: Internal Server Error.
  */
 router.delete('/:id', characterController.deleteCharacter);
 
 module.exports = router;
 
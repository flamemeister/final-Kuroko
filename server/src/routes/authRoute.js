/**
 * @file This file defines the routes related to authentication.
 * @description This file contains route definitions for user registration and login.
 */

 const express = require('express');
 const router = express.Router();
 const { registerUser, loginUser } = require('../controllers/authController');
 
 /**
  * @swagger
  * /auth/register:
  *   post:
  *     summary: Register a new user.
  *     description: Endpoint to register a new user.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UserRegistration'
  *     responses:
  *       200:
  *         description: User successfully registered.
  *       400:
  *         description: Bad request. Registration data invalid.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/register', registerUser);
 
 /**
  * @swagger
  * /auth/login:
  *   post:
  *     summary: Login as an existing user.
  *     description: Endpoint to login as an existing user.
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UserLogin'
  *     responses:
  *       200:
  *         description: User successfully logged in.
  *       401:
  *         description: Unauthorized. Invalid credentials.
  *       500:
  *         description: Internal Server Error.
  */
 router.post('/login', loginUser);
 
 module.exports = router;
 
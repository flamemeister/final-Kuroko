const { logError, logWarning, logInfo } = require('../logger');
const admin = require('firebase-admin');
const db = admin.firestore();

/**
 * @file This file defines the controller functions for authentication-related operations.
 * @description This file contains functions to handle user registration and login.
 */

/**
 * Register a new user.
 * @function registerUser
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The email address of the user to register.
 * @param {string} req.body.password - The password of the user to register.
 * @param {Object} res - The response object.
 * @returns {void}
 */
 exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    await db.collection('users').doc(userRecord.uid).set({
      email
    });

    logInfo('User registered successfully');
    res.status(201).send(userRecord.uid);
  } catch (error) {
    logError('Error registering user:', error.message); // Log error message
    res.status(500).send(error.message); // Send error message as response
  }
};


/**
 * Login a user.
 * @function loginUser
 * @param {Object} req - The request object.
 * @param {string} req.body.email - The email address of the user to login.
 * @param {string} req.body.password - The password of the user to login.
 * @param {Object} res - The response object.
 * @returns {void}
 */
 exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);

    await admin.auth().updateUser(userRecord.uid, { password });

    logInfo(`User ${userRecord.uid} logged in successfully`);
    res.status(200).send(`User ${userRecord.uid} logged in successfully`);
  } catch (error) {
    logError('Error logging in:', error.message); // Log error message
    res.status(401).send('Invalid email or password');
  }
};


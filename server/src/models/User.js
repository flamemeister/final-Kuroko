/**
 * @file This file defines the User class.
 * @description This class represents a user and provides methods to save user data to Firestore.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 
 /**
  * Represents a user.
  * @class
  */
 class User {
   /**
    * Create a user.
    * @param {string} email - The email of the user.
    */
   constructor(email) {
     this.email = email;
   }
 
   /**
    * Save the user to Firestore.
    * @async
    * @returns {Promise<string>} The ID of the saved user.
    * @throws {Error} If there is an error while saving the user.
    */
   async save() {
     try {
       const userRef = await db.collection('users').doc();
       await userRef.set({
         email: this.email
       });
       return userRef.id;
     } catch (error) {
       throw error;
     }
   }
 }
 
 module.exports = User;
 
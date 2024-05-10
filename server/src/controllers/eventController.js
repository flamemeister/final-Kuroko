/**
 * @file This file defines the controller functions for event-related operations.
 * @description This file contains functions to handle creating, retrieving, updating, and deleting events.
 */

 const admin = require('firebase-admin');
 const db = admin.firestore();
 const Event = require('../models/Event');
 const { logError, logInfo } = require('../logger');
 
 /**
  * Create a new event.
  * @function createEvent
  * @param {Object} req - The request object.
  * @param {Object} req.body - The request body containing the title, description, start date, and end date of the event.
  * @param {string} req.body.title - The title of the event.
  * @param {string} req.body.description - The description of the event.
  * @param {Date} req.body.startDate - The start date of the event.
  * @param {Date} req.body.endDate - The end date of the event.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.createEvent = async (req, res) => {
   try {
     const eventData = req.body;
     const newEvent = new Event(eventData.title, eventData.description, eventData.startDate, eventData.endDate);
     const eventRef = await db.collection('events').add(newEvent.toObject());
     logInfo('Event created successfully'); // Log success
     res.status(201).json({ id: eventRef.id });
   } catch (error) {
     logError('Error creating event:', error); // Log error
     res.status(500).json({ error: 'Failed to create event' });
   }
 };

 /**
 * Get a random event.
 * @function getRandomEvent
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
exports.getRandomEvent = async (req, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const events = [];
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
    if (events.length === 0) {
      res.status(404).json({ error: 'No events found' });
      return;
    }
    const randomIndex = Math.floor(Math.random() * events.length);
    const randomEvent = events[randomIndex];
    res.status(200).json(randomEvent);
  } catch (error) {
    logError('Error getting random event:', error);
    res.status(500).json({ error: 'Failed to get random event' });
  }
};
 
 /**
  * Get all events.
  * @function getAllEvents
  * @param {Object} req - The request object.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getAllEvents = async (req, res) => {
   try {
     const snapshot = await db.collection('events').get();
     const events = [];
     snapshot.forEach(doc => {
       events.push({ id: doc.id, ...doc.data() });
     });
     logInfo('Retrieved all events successfully'); // Log success
     res.status(200).json(events);
   } catch (error) {
     logError('Error getting events:', error); // Log error
     res.status(500).json({ error: 'Failed to get events' });
   }
 };
 
 /**
  * Get an event by ID.
  * @function getEventById
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the event to retrieve.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.getEventById = async (req, res) => {
   try {
     const { id } = req.params;
     const doc = await db.collection('events').doc(id).get();
     if (!doc.exists) {
       res.status(404).json({ error: 'Event not found' });
     } else {
       res.status(200).json({ id: doc.id, ...doc.data() });
     }
   } catch (error) {
     logError('Error getting event by ID:', error); // Log error
     res.status(500).json({ error: 'Failed to get event by ID' });
   }
 };
 
 /**
  * Update an event.
  * @function updateEvent
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the event to update.
  * @param {Object} req.body - The request body containing the updated title, description, start date, and end date of the event.
  * @param {string} req.body.title - The updated title of the event.
  * @param {string} req.body.description - The updated description of the event.
  * @param {Date} req.body.startDate - The updated start date of the event.
  * @param {Date} req.body.endDate - The updated end date of the event.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.updateEvent = async (req, res) => {
   try {
     const { id } = req.params;
     const eventData = req.body;
     await db.collection('events').doc(id).update(eventData);
     logInfo('Event updated successfully'); // Log success
     res.status(200).json({ message: 'Event updated successfully' });
   } catch (error) {
     logError('Error updating event:', error); // Log error
     res.status(500).json({ error: 'Failed to update event' });
   }
 };
 
 /**
  * Delete an event.
  * @function deleteEvent
  * @param {Object} req - The request object.
  * @param {string} req.params.id - The ID of the event to delete.
  * @param {Object} res - The response object.
  * @returns {void}
  */
 exports.deleteEvent = async (req, res) => {
   try {
     const { id } = req.params;
     await db.collection('events').doc(id).delete();
     logInfo('Event deleted successfully'); // Log success
     res.status(200).json({ message: 'Event deleted successfully' });
   } catch (error) {
     logError('Error deleting event:', error); // Log error
     res.status(500).json({ error: 'Failed to delete event' });
   }
 };
 
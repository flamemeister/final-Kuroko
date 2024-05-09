const admin = require('firebase-admin');
const db = admin.firestore();
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    try {
      const eventData = req.body;
      const newEvent = new Event(eventData.title, eventData.description, eventData.startDate, eventData.endDate);
      const eventRef = await db.collection('events').add(newEvent.toObject());
      res.status(201).json({ id: eventRef.id });
    } catch (error) {
      console.error('Error creating event:', error);
      res.status(500).json({ error: 'Failed to create event' });
    }
  };
  

exports.getAllEvents = async (req, res) => {
  try {
    const snapshot = await db.collection('events').get();
    const events = [];
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ error: 'Failed to get events' });
  }
};

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
    console.error('Error getting event by ID:', error);
    res.status(500).json({ error: 'Failed to get event by ID' });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    await db.collection('events').doc(id).update(eventData);
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('events').doc(id).delete();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

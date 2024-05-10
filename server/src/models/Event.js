/**
 * @file This file defines the Event class.
 * @description This class represents an event with a title, description, start date, and end date.
 */

/**
 * Represents an event.
 * @class
 */
 class Event {
    /**
     * Create an event.
     * @param {string} title - The title of the event.
     * @param {string} description - The description of the event.
     * @param {Date} startDate - The start date of the event.
     * @param {Date} endDate - The end date of the event.
     */
    constructor(title, description, startDate, endDate) {
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  
    /**
     * Convert the event to a plain JavaScript object.
     * @returns {Object} A plain JavaScript object representing the event.
     */
    toObject() {
      return {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate : this.endDate,
      };
    }
  }
  
  module.exports = Event;
  
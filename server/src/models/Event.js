class Event {
    constructor(title, description, startDate, endDate) {
      this.title = title;
      this.description = description;
      this.startDate = startDate;
      this.endDate = endDate;
    }
  
    // Method to convert Event object to plain JavaScript object
    toObject() {
      return {
        title: this.title,
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate
      };
    }
  }
  
  module.exports = Event;
  
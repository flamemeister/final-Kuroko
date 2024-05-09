/**
 * @file This file defines the Comment class.
 * @description This class represents a comment with text content and the ID of the user who posted it.
 */

/**
 * Represents a comment.
 * @class
 */
 class Comment {
    /**
     * Create a comment.
     * @param {string} text - The text content of the comment.
     * @param {string} userId - The ID of the user who posted the comment.
     */
    constructor(text, userId) {
      this.text = text;
      this.userId = userId;
    }
  }
  
  module.exports = Comment;
  
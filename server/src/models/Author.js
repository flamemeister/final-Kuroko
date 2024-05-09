/**
 * @file This file defines the Author class.
 * @description This class represents an author with attributes such as name, age, role, and description.
 */

/**
 * Represents an author.
 * @class
 */
 class Author {
  /**
   * Create an author.
   * @param {string} name - The name of the author.
   * @param {number} age - The age of the author.
   * @param {string} role - The role or profession of the author.
   * @param {string} description - The description of the author.
   */
  constructor(name, age, role, description) {
    this.name = name;
    this.age = age;
    this.role = role;
    this.description = description;
  }
}

module.exports = Author;

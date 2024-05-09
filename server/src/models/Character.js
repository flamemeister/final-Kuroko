/**
 * @file This file defines the Character class.
 * @description This class represents a character with attributes such as name, age, description, image URL, and skill.
 */

/**
 * Represents a character.
 * @class
 */
 class Character {
  /**
   * Create a character.
   * @param {string} name - The name of the character.
   * @param {number} age - The age of the character.
   * @param {string} description - The description of the character.
   * @param {string} imageUrl - The URL of the image associated with the character.
   * @param {string} skill - The skill or special ability of the character.
   */
  constructor(name, age, description, imageUrl, skill) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.imageUrl = imageUrl;
    this.skill = skill;
  }
}

module.exports = Character;

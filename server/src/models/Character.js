const admin = require('firebase-admin');
const db = admin.firestore();

class Character {
  constructor(name, age, description, imageUrl, skill) {
    this.name = name;
    this.age = age;
    this.description = description;
    this.imageUrl = imageUrl;
    this.skill = skill;
  }
}

module.exports = Character;

const admin = require('firebase-admin');
const db = admin.firestore();

class User {
  constructor(email) {
    this.email = email;
  }

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

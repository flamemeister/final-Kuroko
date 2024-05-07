const admin = require('firebase-admin');
const db = admin.firestore();

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Create user with Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    // Optionally, save user information to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email
    });

    res.status(201).send(userRecord.uid);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send(error);
  }
};

// authController.js
const admin = require('firebase-admin');
const db = admin.firestore();

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password
    });

    await db.collection('users').doc(userRecord.uid).set({
      email
    });

    res.status(201).send(userRecord.uid);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send(error);
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);

    await admin.auth().updateUser(userRecord.uid, { password });

    res.status(200).send(`User ${userRecord.uid} logged in successfully`);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send('Invalid email or password');
  }
};




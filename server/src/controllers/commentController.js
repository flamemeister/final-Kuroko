const admin = require('firebase-admin');
const db = admin.firestore();
const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
      const { text } = req.body;
      const commentData = {
          text: text,
      };

      const commentRef = await db.collection('comments').add(commentData);
      
      res.status(201).json({ id: commentRef.id, ...commentData });
    } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    }
};


exports.getAllComments = async (req, res) => {
  try {
    const snapshot = await db.collection('comments').get();
    const comments = [];
    snapshot.forEach(doc => {
      comments.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error getting comments:', error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection('comments').doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.status(200).json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error('Error getting comment by ID:', error);
    res.status(500).json({ error: 'Failed to get comment by ID' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const newData = { text };
    await db.collection('comments').doc(id).update(newData);
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('comments').doc(id).delete();
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};


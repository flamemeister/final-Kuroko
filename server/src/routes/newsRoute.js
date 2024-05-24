const express = require('express');
const router = express.Router();
const { saveNewsToLocal, getLocalNews } = require('../controllers/localNewsController');
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require('../controllers/newsController');

// Existing routes
router.post('/', createNews);
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

// New routes for local database
router.post('/local', saveNewsToLocal);
router.get('/local', getLocalNews);

module.exports = router;

const { Router } = require('express');
const { createPost, getPosts, getPost, getCatPosts, getUserPost, editPost, deletePost } = require("../controllers/postControllers");
const middlewareAuth = require('../middleware/middlewareAuth');

const router = Router();

// Middleware for authentication is applied here
router.post('/', middlewareAuth, createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.get('/categories/:category', getCatPosts);
router.get('/users/:id', getUserPost);
router.patch('/:id', middlewareAuth, editPost); // Add middlewareAuth here
router.delete('/:id', middlewareAuth, deletePost); // Add middlewareAuth here for delete as well if needed

module.exports = router;

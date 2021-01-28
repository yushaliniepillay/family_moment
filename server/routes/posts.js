import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, insertImg } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// http://localhost:5000/posts
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', auth, getPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.patch('/:id', auth, insertImg);


export default router;
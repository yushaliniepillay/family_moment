import express from 'express';

import { insertImg } from '../controllers/posts.js';
import {  fetchImages, createImage } from '../controllers/images.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, fetchImages);
router.patch('/:id', auth, insertImg);
router.post('/profile', auth, createImage);

export default router;
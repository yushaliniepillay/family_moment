import express from 'express';
import mongoose from 'mongoose';

import ImagePost from '../models/imagePost.js';

const router = express.Router();


export const fetchImages = async (req, res) => { 
    try {
        const imagePost = await ImagePost.find();
                
        res.status(200).json(imagePost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createImage = async (req, res) => {
    const post = req.body;

    const newImagePost = new ImagePost({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newImagePost.save();

        res.status(201).json(newImagePost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;
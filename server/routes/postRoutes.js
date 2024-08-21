const express = require('express');
const router = express.Router();
const Image = require('../models/image');
import Post from '../models/posts';

router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
  });
  
  router.route('/').post(async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
  
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
  
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
  });
  
  export default router;
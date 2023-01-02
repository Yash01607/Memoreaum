import mongoose from 'mongoose';
import PostModel from '../models/PostModel.js';

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostModel.find({});

    return res.status(200).json(postMessages);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  // console.log(req.body);
  const post = new PostModel({
    title: req.body.title || '',
    message: req.body.message || '',
    creator: req.body.creator || '',
    tags: req.body.tags || '',
    selectedFile: req.body.selectedFile || '',
  });
  try {
    const newPost = await post.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).send({ message: 'No Post With this Id' });
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        _id: postId,
        title: req.body.title || '',
        message: req.body.message || '',
        creator: req.body.creator || '',
        tags: req.body.tags || '',
        selectedFile: req.body.selectedFile || '',
      },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).send({ message: 'No Post With this Id' });
  }

  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);

    return res.status(200).json({ message: 'Post deleted successfully!' });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).send({ message: 'No Post With this Id' });
  }

  try {
    const post = await PostModel.findById(postId);
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        likeCount: post.likeCount + 1,
      },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

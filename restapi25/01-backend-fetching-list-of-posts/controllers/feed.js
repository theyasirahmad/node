const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {

  Post.find()
    .then((posts) => {
      res.status(200).json({ message: 'optional', posts: posts, })
    })
    .catch((err) => {

      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);

    });
};

exports.createPost = (req, res, next) => {
  console.log('we here', req.body.title)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    const error = new Error('validation failed');
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path.replace("\\" ,"/");
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db

  const post = new Post({

    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: 'yasir' }
  });
  post.save().then((result) => {

    // console.log('result ', result);
    res.status(201).json({
      message: 'Post Created Successfully',
      post: result
    })

  }).catch((err) => {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find product');
        error.statusCode = 404;
        throw error;
      }
      return res.status(200).json({ message: 'Optional Message, Post Fetched', post: post });
    })
    .catch((err) => {

      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);

    });
}

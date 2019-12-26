const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/duck.jpg',
        creator: {
          name: 'Maximilian'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  console.log('we here', req.body.title)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'validation failed',
      errors: errors.array()
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db

  const post = new Post({

    title: title,
    content: content,
    imageUrl: '124nxczcczasdfasf',
    creator: { name: 'yasir' }
  });
  post.save().then((result) => {

    // console.log('result ', result);
    res.status(201).json({
      message: 'Post Created Successfully',
      post: result
    })

  }).catch((err) => {
    console.log(err);
  })
  // res.status(201).json({
  //   message: 'Post created successfully!',
  //   post: { id: new Date().toISOString(), title: title, content: content }
  // });
};

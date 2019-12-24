const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

//GET feed/posts
router.get('/posts',feedController.getPosts);

//POST feed/post
router.post('/post',feedController.postPosts);

module.exports = router;


















//codepen code section 24

{/* <button id="get" >Get Post </button>
<button id="post" >Create Post </button> */}


// const getButton = document.getElementById('get');
// const postButton = document.getElementById('post');

// getButton.addEventListener('click',()=>{
 
//   fetch('http://localhost:8080/feed/posts')
//   .then((res)=>res.json())
//   .then(resData=>console.log(resData))
//   .catch((err)=>console.log(err));
// });

// postButton.addEventListener('click',()=>{
 
//   fetch('http://localhost:8080/feed/post',{
//     method: 'POST',
//     body:JSON.stringify({
//     title: 'post using codepen',
//     content: 'content of current post'
//     }),
//     headers:{
//       'Content-Type':'application/json'
//     }
//     })
//   .then((res)=>res.json())
//   .then(resData=>console.log(resData))
//   .catch((err)=>console.log(err));
// });
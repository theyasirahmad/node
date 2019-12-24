exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '123',
            title: 'first post',
            content: 'this is content',
            imageUrl: 'images/duck.png',
            creator: {
                name: 'yasir'
            },
            createdAt: new Date(),
        }]
    });
};


exports.postPosts = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'post created successfully',
        post: {
            _id: new Date().toISOString(), title: title, content: content,
            creator: {
                name: 'yasir',
            },
            createdAt: new Date(),
        }
    });

};
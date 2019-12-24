const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');


// const errorController = require('./controllers/error');

const mongoConnect = require('./utility/database').mongoConnect;

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// app.use((req, res, next) => {
//         const product = new Product
// })

mongoConnect(() => {
    app.listen(3000, () => {
        console.log(`Server started on port`);
    });

});
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5e02a25f8cb7252e904b9d2b')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000);
// });
mongoose
  .connect('mongodb+srv://user101:8wjw1HpFJZvd8kd4@cluster0-56yha.mongodb.net/shop?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then((res) => {
    User.findOne().then((user) => {

      if (!user) {
        const user = new User({
          name: 'Yasir',
          email: 'yasira640@gmail.com',
          cart: {
            items: []
          }
        });
        user.save()
      }
    })
    app.listen(3000);
  }).catch((err) => {
    console.log(err)
  })
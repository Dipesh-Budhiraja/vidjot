const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

//connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidjot-dev', {useMongoClient: true})
.then(() => { console.log('Mongodb connected');})
.catch((err) => {
    console.log(err);
});

//load idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//how middleware use
// app.use(function(req, res, next){
//     // console.log(Date.now());
//     // req.name = 'dipesh';
//     next();
// });

//middlewares
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    // console.log(req.name);
    const title = 'welcome';
    res.render('INDEX', {title: title});
});

//about route
app.get('/about', (req, res) => {
    res.render('ABOUT');
});
const port = 3000;

app.listen(3000, () => {
    console.log(`server running on port ${port}`);
    
});
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

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

//body parsa
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 

app.get('/', (req, res) => {
    // console.log(req.name);
    const title = 'welcome';
    res.render('INDEX', {title: title});
});

//about route
app.get('/about', (req, res) => {
    res.render('ABOUT');
});

//idea index
app.get('/ideas', (req, res) => {
    res.render('ideas/index');
});

//get idea form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
});

//process form 
app.post('/ideas', (req, res) => {
    var errors = [];

    if(!req.body.title){
        errors.push({text: 'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text: 'Please add some detail'});
    }

    if(errors.length > 0){
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    }else{
        const newIdea = {
            title: req.body.title,
            details: req.body.details
        };
        
        new Idea(newIdea)
        .save()
        .then(idea => {
            res.redirect('/ideas');
        });
    }
});

const port = 3000;

app.listen(3000, () => {
    console.log(`server running on port ${port}`);
    
});
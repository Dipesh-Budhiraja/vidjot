const express = require('express');
const exphbs  = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config
require('./config/passport')(passport);

//db config
const db = require('./config/database');

//connect to mongoose
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost/vidjot-dev', {useMongoClient: true})
mongoose.connect(db.mongoURI, {useMongoClient: true})
.then(() => { console.log('Mongodb connected');})
.catch((err) => {
    console.log(err);
});


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

//static folder
app.use(express.static(path.join(__dirname, 'public')));

// method override middleware
app.use(methodOverride('_method'));

//express session middleware
app.use(session({
    secret: 'keyboardo cats',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.get('/', (req, res) => {
    // console.log(req.name);
    const title = 'welcome';
    res.render('INDEX', {title: title});
});

//about route
app.get('/about', (req, res) => {
    res.render('ABOUT');
});

//use routes
app.use('/ideas', ideas);
app.use('/users', users);

const port =  process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`server running on port ${port}`);
    
});
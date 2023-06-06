const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


// setting up template view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// express session
app.use(session({
    name: 'FakeBook',
    secret: 'mySecretKey',  //will change it later
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)  // maximum age(expiry) of the session cookie in milliseconds
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Require your route files &
// Use the route files as middleware
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server on port : ${err}`);
        return;
    }
    console.log('Server is up and running on the port : ', port);
});

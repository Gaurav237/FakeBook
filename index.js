const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();

// adding express-ejs-layouts, form common header and footer page
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// using Passsport-JWT for authentication
const passportJwt = require('./config/passport-local-strategy');

// setting up mongo store
const MongoStore = require('connect-mongo')(session);

// setting up flash notification
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// added css,js,.. files
app.use(express.static('./assets'));

// it makes the upload path available to browser
// it serve static files from the /uploads directory.
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up template view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// express session
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'FakeBook',
    secret: 'mySecretKey',  //will change it later 
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)  // maximum age(expiry) of the session cookie in milliseconds
    },
    store: new MongoStore(
        {
            mongooseConnection: db,  // mongoose.connection
            autoRemove: 'disabled'
        },
        function (err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Configure flash middleware
app.use(flash());
/* used this customMiddleware.setFlash() to pass the flash message 
    from req.flash to session cookies., instead of explicitly passing messages to locals everytime.
    => res.redirect('/', { flash : {'success': 'msg'}}) 
*/
app.use(customMiddleware.setFlash);

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

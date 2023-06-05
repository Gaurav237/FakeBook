const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();

const db = require('./config/mongoose');

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

// Require your route files &
// Use the route files as middleware
app.use('/', require('./routes'));

// setting up template view engine
app.set('view engine', 'ejs');
app.set('views', './views')

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server on port : ${err}`);
        return;
    }
    console.log('Server is up and running on the port : ', port);
});

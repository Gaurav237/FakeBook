const express = require('express');
const port = 8000;
const app = express();

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


const express = require('express'),
cors = require('cors'),
app = express(),
bodyParser = require('body-parser');
app.options('*', cors());  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'OPTIONS,POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }),
  bodyParser.json({ limit: '50mb', extended: true }));

//database connection
const dbconn = require('./config/databaseconn');
dbconn();

// define a simple route
app.get('/', (req, res) => {
  res.json({ "message": "Your server is set up. Go ahead and define routes to make calls the data: " });
});

require('./app/routes/routes')(app);

let listen_host = '0.0.0.0';
let listen_port = 8000;

// listen for requests
app.listen(listen_port, () => {
  console.log("Server is listening on port: ", listen_port);
});

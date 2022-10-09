const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const https = require("https");
const fs = require("fs");
const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origins: 'http://localhost:4200',
    methods: ["GET", "POST"],
  }
});

//socket initialisation//
const sockets = require("./socket.js");
const server = require("./listen.js");

//parse requests
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// respond with "server page: hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  console.log("Server is running at port", PORT);
  res.send("Server Page: Hello World");
});


//mongoDB setup and database operations declared
var mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017';
const userRoute = require('./routes/UserOperations')
const groupRoute = require('./routes/GroupOperations')
const channelRoute = require('./routes/ChannelOperations')
MongoClient.connect(url, {family:4}, function(err, client){
  if (err) {return console.log(err)}
      const dbName = 'chatappDB';
      const db = client.db(dbName);

      //user operations routes //
      app.post('/addUser', userRoute.insert);
      app.get('/getUsers', userRoute.find);
      //app.put('/editUser', userRoute.update);
      app.post('/deleteUser', userRoute.delete);


      //group operations routes //
      app.post('/addGroup', groupRoute.insert);
      app.get('/getGroups', groupRoute.find);
      //app.put('/removeUser', groupRoute.update);
      app.post('/deleteGroup', groupRoute.delete);


      //channel operations routes//
      app.post('/addChannel', channelRoute.insert);
      app.get('/getChannels', channelRoute.find);
      //app.put('/removeUser', channelRoute.update);
      app.post('/deleteChannel', channelRoute.delete);


      //user authentication using mongodb//
     require('./data/login')(app, db);

  require('./listen.js')(http);
})


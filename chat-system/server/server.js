const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const https = require("https");
const url = require('url');
const fs = require("fs");
const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origins: 'http://localhost:4200',
    methods: ["GET", "POST"],
  }
});

const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

const userfile = "./data/user.json";
const users = require(userfile);

const sockets = require("./socket.js");
const server = require("./listen.js");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  console.log("Server is running at port", PORT);
  res.send("hello world");
});


app.post("/api/auth", (req, res) => {
  //console.log(req.body.username); // communication

  const user_data = users.find((user) => user.username == req.body.username && user.password == req.body.password); // check for authentication, will return undefined if not found, .find uses testing function.
  idx = users.findIndex((user) => user.username == req.body.username); // index that this was found.
  sockets.connect(io, PORT);
  server.listen(http, PORT);

  if (user_data) {
    // the user data was found by the .find method
    users[idx].valid = true; // edit original data
    
    res.send(users); // send data back
    users[idx].valid = false; //reset data to false.
  } else if (!user_data) res.send(users); // debugging
});

MongoClient.connect(url, {/*poolSize:10,*/useNewUrlParser: true, useUnifiedTopology: true}, function(err, client){
  if (err) {return console.log(err)}
      const dbName = 'chatappDB';
      const db = client.db(dbName);

      require('./routes/addUser.js')(db,app);
      require('./routes/addGroup.js')(db,app);
      require('./routes/addChannel.js')(db,app);
      require('./routes/postAllUsers')(db,app);
      require('./routes/deleteuser')(db,app,ObjectID);
      require('./routes/Login.js')(db,app);
      require('./routes/getChannels')(db,app);
      require('./routes/getGroups')(db,app);

  //require('./listen.js')(http);
})
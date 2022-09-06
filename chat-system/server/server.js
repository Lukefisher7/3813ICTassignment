const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const https = require("https");
const url = require('url');
const fs = require("fs");
const PORT = 3000;

var users = [
  {
    username: "John",
    password: "1234",
    role: "Group Admin",
    valid: false,
  },

  {
    username: "Peter",
    password: "1884",
    role: "Group Admin",
    valid: false,
  },
];

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

  const user_data = users.find((user) => user.username == req.body.username); // check for authentication, will return undefined if not found, .find uses testing function.
  idx = users.findIndex((user) => user.username == req.body.username); // index that this was found.

  if (user_data) {
    // the user data was found by the .find method
    users[idx].valid = true; // edit original data
    res.send(users); // send data back
    users[idx].valid = false; //reset data to false.
  } else if (!user_data) res.send(users); // debugging
});



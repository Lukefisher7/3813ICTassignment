//delete chat history
exports.delete = function (app, db) {

   
    /* This is the code that deletes the chat history. */
    app.post("/api/deleteChats", (req, res) => {
        
        var query = { channel: req.body.channel };

        //check if history already exists
        db.collection('chatHistory').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {
                db.collection('chatHistory').deleteOne(query, function(err) {
                    if (err) throw err;
                    res.send(true);
                });
            }
        });
        
    });

}
//get chat history
exports.find = function (app, db) {

    /* This is a get request to the server. It is asking for the chats collection. */
    app.get('/api/getChats', (req, res) => {
      var query = {};
      db.collection('chatHistory').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
    
}

//insert chat history
exports.insert = function (app, db) {

   
    /* This is the code that is executed when the server receives a POST request to the
    /api/insertChats endpoint. It takes the channel and chats from the request body and inserts them
    into the database. */
    app.post("/api/insertChats", (req, res) => {

        var chatObj = { channel: req.body.channel, chats: req.body.chats }
        var query = { channel: req.body.channel };

        //check if history already exists
        db.collection('chatHistory').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {

                db.collection('chatHistory').deleteOne(query, function(err) {
                    if (err) throw err;
                });
            }
        });

        db.collection('chatHistory').insertOne(chatObj, function(err, result) {
            if (err) throw err;
            res.send(true);
        });
    });

}
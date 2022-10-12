//delete chat history
exports.delete = function (app, db) {

   
    /* This is the code that deletes the chat history. */
    app.post("/api/deleteChat", (req, res) => {
        
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
    app.get('/api/getChat', (req, res) => {
      var query = {};
      db.collection('chatHistory').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
    
}

//insert chat history
exports.insert = function (app, db) {
    app.post("/api/insertChat", (req, res) => {

        var chatObj = { channel: req.body.channel, chats: req.body.chats }
        var query =  {channel: req.body.channel};
        var chat = req.body.chats
        console.log(chatObj)
        db.collection('chatHistory').updateOne({'channel': req.body.channel}, {$set: {chats: chat}}, function(err, result) {
            if (err) throw err;
            if(result == true){
                alert("chat updated");
            }
            res.send(true);
        });
    });

}
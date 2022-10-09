//add channel
exports.insert = function(req, res){
    var channelObj = { name: req.body.name, groupName: req.body.groupName , users: req.body.users }
    var channelExists = false;


    //check if channel already exists
    var query = { title: req.body.title };
    db.collection('channels').find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result.length != 0) {
            channelExists = true;
        }
    });

    if (!channelExists) {
        //insert the new channel into db
        db.collection('channels').insertOne(channelObj, function(err, result) {
            if (err) throw err;
            res.send(true);
        });
    }
    else {
        res.send(false);
    }
}

//delete channel
exports.delete = function (req, res) {
    /* code that deletes a channel from the database. */
        var query = { name: req.body.name };
        console.log("deleting channel: ", req.body.name);
        db.collection("channels").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
 

}

//get list of channels
exports.find = function(req,res){
    var query = {};
      db.collection('channels').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    
}
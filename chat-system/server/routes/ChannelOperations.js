
//add channel
exports.insert = function (app, db) {

    /* This is a post request that is being sent to the server. It is sending the title, groupName, and
    members of the channel to the server. The server then checks if the channel already exists. If
    it does not, it inserts the channel into the database. If it does, it sends a false response. */
    app.post("/api/addChannel", (req, res) => {
        var channelObj = { name: req.body.name, group: req.body.group , users: req.body.users }

        var channelExists = false;


        //check if channel already exists
        var query = { name: req.body.name };
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
    });
}

//delete channel
exports.delete = function (app, db) {

    /* deletes a channel from the database based on name of channel using deleteOne mongo function. */
    app.post("/api/deleteChannel", (req, res) => {
        var query = { name: req.body.name };
        console.log("deleting channel: ", req.body.name);
        db.collection("channels").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
    });

}

//get list of channels
exports.find = function (app, db) {

    /* This is a get request to the server. asks for array of channels from the database collection named channels. */
    app.get('/api/getChannels', (req, res) => {
      var query = {};
      db.collection('channels').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });

}
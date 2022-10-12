
//add channel
exports.insert = function (app, db) {//check if channel already exists
    app.post("/api/addChannel", (req, res) => {
    var query = { name: req.body.name };
    var channelExists = false;
    var channelObj = {name: req.body.name, users: req.body.users}
    var channelList = [];
    addedchannel = req.body.name;
    db.collection('channels').find(query).toArray(function(err, result) {
        if (err) throw err;
        if (result.length != 0) {
            channelExists = true;
        }
        if (!channelExists) {//insert the new channel into db
            db.collection('channels').insertOne(channelObj, function(err, result) {
                if (err) throw err;
            });
            db.collection('groups').find({name: req.body.group}).toArray(function(err, result) { 
                if (err) throw err;
                console.log(result)
                channelList = result[0].channels;
                console.log(channelList);
                channelList.push(addedchannel);
                //adding channel to group object, channels array where channel was created
                db.collection('groups').updateOne({'name': req.body.group}, {$set: {channels: channelList}}, (err, result) =>{if (err) throw err;
                    res.send(true);})
            })
        }
        else {
            res.send(false);
        }
    });
    })
}



//delete channel
exports.delete = function (app, db) {

    // deletes a channel from the database based on name of channel using deleteOne
    app.post("/api/deleteChannel", (req, res) => {
        var query = { name: req.body.name };
        console.log("deleting channel: ", req.body.name);
        db.collection("channels").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
    });

}

//add user to channel 
exports.add = function(app,db){
    app.post('/api/addChannelUser', (req, res) => {
        
            var channel = req.body.name;
            var user =  req.body.users;
            var userlist = [];
            console.log(channel);
            db.collection('channels').find({'name': channel}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result)
                userlist = result[0].users;
                console.log(userlist);
                userlist.push(user);
                db.collection('channels').updateOne({'name': channel}, {$set: {users: userlist}}, function(err, result){
                    if (err) throw err;
                    res.send(true);
                    

                });
                                  
            
            }
            );
        })}
//remove user from group
exports.remove = function(app,db){
    app.post('/api/removeChannelUser', (req, res) => {
        
            var channel = req.body.name;
            var user =  req.body.users;
            var userlist = [];
            console.log(channel);
            db.collection('channels').find({'name': channel}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result)
                userlist = result[0].users;
                index = userlist.indexOf(user);
                userlist.splice(index,1);
                console.log(userlist);
                db.collection('channels').updateOne({'name': channel}, {$set: {users: userlist}}, function(err, result){
                    if (err) throw err;
                    res.send(true);
                    
 
                });
                                  
            
            }
            );
        })}
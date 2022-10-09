//add group
exports.insert = function(req,res){
    var groupObj = { name: req.body.name, users: req.body.users }

        var groupExists = false;

        //check if group already exists
        var query = { name: req.body.name };
        db.collection('groups').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {
                groupExists = true;
            }
        });

        if (!groupExists) {
            //insert the new group into db
            db.collection('groups').insertOne(groupObj, function(err, result) {
                if (err) throw err;
                res.send(true);
            });
        }
        else {
            res.send(false);
        }
}

//delete group
exports.delete = function(req,res){
    var query = { name: req.body.name };
        console.log("deleting group: ", req.body.name);
        db.collection("groups").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
}

//get list of groups
exports.list = function(req,res){
    var query = {};
      db.collection('groups').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
}
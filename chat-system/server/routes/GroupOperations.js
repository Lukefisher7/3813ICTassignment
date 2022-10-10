//add group
exports.insert = function(app,db){

    app.post("/api/insertGroup", (req, res) => {
    var groupObj = { name: req.body.name, users: req.body.users }

        var groupExists = false;

        //checking if group name already exists through group collection//
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
        };
    });
}


//delete group with deleteOne function in mongo database for groups
exports.delete = function(app,db){
    app.post("/api/deleteGroup", (req, res) => {
    var query = { name: req.body.name };
        console.log("deleting group: ", req.body.name);
        db.collection("groups").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
    });
}

//get list of groups into array from database 'groups'
exports.list = function(app,db){
    app.get('/api/getGroups', (req, res) => {
    var query = {};
      db.collection('groups').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
      });
    });
}

/*exports.add = function(app,db){
    app.post('/api/addGroupUser', (req, res) => {
        var newUser = { name: req.body.username }
    
            var groupUserExists = false;
    
            //checking if group name already exists through group collection//
            var query = { name: req.body.users };
            db.collection('groups').find(query).toArray(function(err, result) {
                if (err) throw err;
                if (result.length != 0) {
                    groupUserExists = true;
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
            };
       
}*/
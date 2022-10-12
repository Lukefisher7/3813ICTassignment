//add group
exports.insert = function(app,db){

    app.post("/api/insertGroup", (req, res) => {
    
        groupObj = req.body

        var groupExists = false;

        //checking if group name already exists through group collection//
        var query = { name: req.body.name };
        db.collection('groups').find(query).toArray(function(err, result) {
            if (err) throw err;
            if (result.length != 0) {
                groupExists = true;
                console.log("group already exists")
            }
        });

        if (!groupExists) {
            //insert the new group into db
            db.collection('groups').insertOne(groupObj, function(err, result) {
                if (err) throw err;
                res.send(true);
                console.log("group added")
            });
        }
        else {
            res.send(false);
            console.log('group not added')
        };
    });
}


//delete group with deleteOne function in mongo database for groups
exports.delete = function(app,db){

    app.post("/api/deleteGroup", (req, res) => {
    var group = req.body.name;
    console.log(group);
        console.log("deleting group: ", group);
        db.collection("groups").deleteOne({name : group}, function(err, result) {
            if (err) throw err;
            res.send(true);
        });
    });
}

//get list of groups into array from database 'groups'
exports.list = function(app,db){
    app.get('/api/getGroups', (req, res) => {
    var query = {};
      db.collection('groups').find(query).toArray((err, result)=>{
        if (err) throw err;
        res.send(result);
      });
    });
}

exports.add = function(app,db){
    app.post('/api/addGroupUser', (req, res) => {
        
            var group = req.body.name;
            var user =  req.body.users;
            var userlist = [];
            console.log(group);
            db.collection('groups').find({'name': group}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result)
                userlist = result[0].users;
                console.log(userlist);
                userlist.push(user);
                db.collection('groups').updateOne({'name': group}, {$set: {users: userlist}}, function(err, result){
                    if (err) throw err;
                    res.send(true);
                    

                });
                                  
            
            }
            );
        })}
              
                    
       
        exports.remove = function(app,db){
            app.post('/api/removeGroupUser', (req, res) => {
                
                    var group = req.body.name;
                    var user =  req.body.users;
                    var userlist = [];
                    console.log(group);
                    db.collection('groups').find({'name': group}).toArray(function(err, result) {
                        if (err) throw err;
                        console.log(result)
                        userlist = result[0].users;
                        index = userlist.indexOf(user);
                        userlist.splice(index,1);
                        console.log(userlist);
                        db.collection('groups').updateOne({'name': group}, {$set: {users: userlist}}, function(err, result){
                            if (err) throw err;
                            res.send(true);
                            

                        });
                                          
                    
                    }
                    );
                })}
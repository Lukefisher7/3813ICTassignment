exports.insert = function(req,res){


        var user = { username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role};
        var uname = req.body.username;
        var duplicate = false;

        var query = {username: uname};

        const collection = db.collection('users');
        //check for duplicate usernames 
        collection.find(query).toArray((err, count)=>{
        if(count != 0){
            duplicate = true;
        }

        if (!duplicate){
        //if no duplicate 
        collection.insertOne (user, (err, dbres)=>{
        if (err) throw err;
        
        //send back to client true to indicate user has been inserted
        res.send(true);
        })
        }else{
        //On Error send back false 
        res.send(false);
        }
    });

    }

exports.delete = function (req,res) {

    /* Deleting a user from the database. */
    
        var query = { username: req.body.username };
        console.log("removing user: ", req.body.username);
        db.collection("users").deleteOne(query, function(err) {
            if (err) throw err;
            res.send(true);
        });
    }

exports.find = function (req,res) {

    /* This is a find request to the server. It is getting all the users from the database and storing into array. */
    
        var query = {};
        db.collection('users').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        });
    

    }

//need to add edit feature

exports.update = function(req,res){
    var query = { username: req.body.username };
    var newRole = {$set: {role: req.body.role}}
    console.log("updating user role: ", req.body.username);
    db.collection('users').updateOne(query, newRole, function(err,res){
        if (err) throw err;
        console.log("user role updated");
    });

}
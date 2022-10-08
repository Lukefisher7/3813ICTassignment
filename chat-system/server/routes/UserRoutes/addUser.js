module.exports = function(db, app){

    app.post('/api/addUser', function(req, res){
    
    
        var user = { username: req.body.username, email: req.body.email, password: req.body.password, role: req.body.role};
        var uname = req.body.username;
        var duplicate = false;

        var query = {username: uname};

        const collection = db.collection('users');
        //check for duplicate id's 
        collection.find(query).toArray((err, count)=>{
        if(count != 0){
            duplicate = true;
        }
        if (count== 0){
        //if no duplicate 
        collection.insertOne (users, (err, dbres)=>{
        if (err) throw err;
        
        //send back to client true to indicate user has been inserted
        res.send(true);
        })
        }else{
        //On Error send back error message 
        res.send(false);
        }
    });
    });
    }
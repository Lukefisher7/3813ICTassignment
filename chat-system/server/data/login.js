module.exports = function(app, db){

    app.post("/api/auth", async (req, res) => {

        var Enteredusername = req.body.username;
        var Enteredpassword = req.body.password;

        userObj = {username: Enteredusername, password: Enteredpassword};
        console.log(userObj)
        const collection = db.collection("users");

        //count the num of username/password combo in database (should be 1 if valid, 0 if invalid)
        var count = await collection.countDocuments(userObj);
        console.log(count);
        if(count > 0){
            res.send(true);
            console.log();
        }
        if(count = 0){
            res.send(false);
            alert("try again");
        }

    });

}
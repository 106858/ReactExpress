//step1-load the driver
var mssql=require('mysql');
var exp=require('express');
var app=exp();
var bparser=require('body-parser');
var statusMessage;
bparserinit=bparser.urlencoded({extended:false});//to read the contents of the server      
var queryResult;
var cors=require('cors');
//initializing the express js
app.use(cors());
app.use(exp.json());
//database connection
const mssqlconnection=mssql.createConnection({
    localhost:'localhost',
    user:'root',
    password:'root',
    database:'world',
    port:3306
});
// above all together call as connectionstring

function feedback(error){
    if(error != undefined){
        console.log(error);
    }
    else{
            console.log("open the browser");
    }
}

    function checkConnection(error){
        if(error!=undefined){
            console.log(error);
        }
        else{
            console.log("Connection established successfully");
        }
    }
    mssqlconnection.connect(checkConnection);
 
    function provideAllUser(error,result){
        queryResult=result;
        console.log(result);
    }
    function getAllUser(req,res){
             mssqlconnection.connect(checkConnection);
             mssqlconnection.query("Select * from  users",provideAllUser);
             res.send(queryResult);
    }
   function provideUser(error,result){
        queryResult = result;
        console.log(result);
    }
    function getUserById(req,res){
         var userId=req.query.id;
        mssqlconnection.query("SELECT * FROM Users WHERE userid=?",userId,provideUser);
        res.send(queryResult);
    }
 
    function provideInsertUser(error,result){
        (error == undefined) ? statusMessage="<h1>inserted successfully<body><h1></html>" : statusMessage="insertion failed";
        console.log(result);
    }
    function insertUser(req,res){
        var username=req.body.adduser; 
        var password=req.body.addpassword;
        var email=req.body.addemail;
        console.log(username+"\t\t"+password+"\t\t"+email);
        mssqlconnection.query("INSERT INTO Users (userid,password,emailid) VALUES (?,?,?)",[username,password,email],provideInsertUser);
        mssqlconnection.commit();
        res.send(JSON.stringify(statusMessage));
    }
 
    function provideUpdateUser(error,result){
        queryResult = result;
        console.log(result);
    }
 
    function updateUser(req,res){
        var username=req.body.updateuser;
        var password=req.body.updatepassword;
        var email=req.body.updatemail;
        //var id=req.body.id;
        mssqlconnection.query("UPDATE Users SET userid=?,password=?,emailid=? WHERE userid=?",[username,password,email,username],provideUpdateUser);
        mssqlconnection.commit();
        res.send(queryResult);
    }
 
    function deleteUser(req,res){
        var username=req.query.deleteusingid;
        mssqlconnection.query("DELETE FROM Users WHERE userid=?",username);
        mssqlconnection.commit();
        res.send(queryResult);
    }
      
    app.get("/getAllUser",getAllUser);
    app.get("/getUserById",getUserById);
    app.post("/insertUser",bparserinit,insertUser);
    app.put("/updateUser",bparserinit,updateUser);
    app.delete("/deleteUser",bparserinit,deleteUser);
    
 
    app.listen(4000,feedback);
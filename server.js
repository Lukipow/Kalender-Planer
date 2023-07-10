//express
const express=require("express");
const app= express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.urlencoded({extended:true}));

//ejs
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//sqlite 
const DATABASE="wochenplaner.db";
const db= require("better-sqlite3")(DATABASE);

// Create a SQL connection
// const connection = better-sqlite3.createConnection({
    //host: 'localhost',
    //user: 'jeffrey@gmail.com',
    //password: '123456789',
    //database: 'wochenplaner.db',
  //});

  //connection.connect(function(err) {
    //if (err) {
      //console.error('Error connecting to sqlite3 database: ' + err.stack);
      //return;
    //}
  
    //console.log('Connected to sqlite3 database');
  //});

app.use(express.static(__dirname + "/public")); 

app.get("/login", function(req,res){
    res.sendFile(__dirname +"/views/login.html")
});

app.get("/register", function(req,res){
    res.sendFile(__dirname +"/views/register.html")
});

app.get("/kalender", function(req,res){
    res.sendFile(__dirname +"/views/index.html")
});

app.get("/indexcopy", function(req,res){
    res.sendFile(__dirname +"/views/indexcopy.html")
});

app.get("/kalender2", function(req,res){
    res.sendFile(__dirname +"/views/index2.html")
});

app.get("/kalender3", function(req,res){
    res.sendFile(__dirname +"/views/index3.html")
});

// Handle sign-in requests
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database for the provided username and password
    const query = 'SELECT * FROM Users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], function(error, results) {
      if (error) {
        console.error('Error querying the database: ' + error.stack);
        res.sendStatus(500);
        return;
      }
  
      if (results.length > 0) {
        // Successful login
        res.sendStatus(200);
      } else {
        // Failed login
        res.sendStatus(401);
      }
    });
  });

   
app.listen(3000,function(){
    console.log("listening on port 3000");
});
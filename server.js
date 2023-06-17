//express
const express=require("express");
const app= express();
app.use(express.urlencoded({extended:true}));

//ejs
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//sqlite 
const DATABASE="wochenplaner.db";
const db= require("better-sqlite3")(DATABASE);


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

app.listen(3000,function(){
    console.log("listening on port 3000");
});
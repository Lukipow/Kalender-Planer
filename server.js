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

//bcrypt
const bcrypt = require('bcrypt')

//session
const session= require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave:false
}));


app.use(express.static(__dirname + "/public")); 


//links
app.get("/login", function(req,res){
    res.render(__dirname +"/views/login.ejs")
});

app.get("/register", function(req,res){
    res.render(__dirname +"/views/register.ejs")
});

app.get("/kalender", function(req,res){
    res.sendFile(__dirname +"/views/index.html")
});

app.listen(3000,function(){
    console.log("listening on port 3000");
});




app.post("/login", function(req,res){
    const benutzername= req.body.benutzername;
    const password= req.body.password;
    let errorMessage="";

    const a= db.prepare(`SELECT passwort FROM nutzer WHERE user= ?`);
    const rows = a.all(benutzername);

    if(rows.length == 1){
        const hash = rows[0].passwort;
        const isValid = bcrypt.compareSync(password, hash);
        if(isValid){
            res.sendFile(__dirname +"/views/index.html")
        }
    }
});

app.post("/register", function(req,res){
    const benutzername = req.body.benutzername;
    const password= req.body.password;
    const repassword= req.body.repassword;
    let errorMessage="";

    if(password!=repassword){
        errorMessage="The password was repeated incorrectly";
        res.render("registerError",{"errorMessage":errorMessage});
    }

    if(passwordValidation(password)!=true){
        errorMessage="The password does not match the validation requirements!";
        res.render("register",{"errorMessage":errorMessage});
    }
    
    const hash= bcrypt.hashSync(password,10);
    const a= db.prepare(`SELECT * FROM nutzer WHERE user= ?`);
    const rows = a.all(benutzername);
    if (rows.length  == 0){
        db.prepare(`INSERT INTO nutzer(user, passwort) values (?, ?)`).run(benutzername, hash);
    }else{
        errorMessage="The username already exists!"
        res.render("registerError",{"errorMessage":errorMessage});
    }         
    
});

//Passwort prüfen
function passwordValidation(password){
    if(password == "") {  
        return false;
    }    
    else if(password.length < 7) {  
        return false;
     }  
    else if(password.length > 30) {  
        return false;
    }  
    else if(password.search(/[a-z]/) < 0) {    
        return false;  
    } 
    else if(password.search(/[A-Z]/) < 0){
        return false;
    }
    else if(password.search(/[1-9]/) < 0){
        return false;
    }
    else {  
        return true;
    }  
}  
//modules
var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");

// made by malyaj singh 2010991425
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
// made by malyaj singh 2010991425
//inserting user data or new user
app.post("/save", function (request, response) {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students",
  });
// made by malyaj singh 2010991425
  var username = request.body.username;
  var password = request.body.password;
  var fname = request.body.fname;
  var gender = request.body.gender;
  var pno = request.body.pno;
  
// made by malyaj singh 2010991425
  if (username.length > 50 ||password.length < 8 ||fname.length > 50 ||gender == null ||pno.length > 10 ||pno.length < 10/**/) {
    response.render("signup copy");
  }
  else{
    connection.connect(function (errror) {
        connection.query("select * from st2", function (errror, result) {
          var obj=false;
          result.find((o, i) => {
            if (o.username === username) {
              obj=true;
              return true; // stop searching
            }
          });
          if(obj==true){
            console.log("found");
            response.render("signup copy 2");
          }// made by malyaj singh 2010991425
          else{
            console.log("not found");
            var sql ="insert into st2(username,password,fname,gender,pno) values('"+username+"','"+password+"','"+fname+"','"+gender+"','"+pno+"')";
            connection.query(sql,function(errror){
            console.log("new user added");
            response.redirect("/")
            })
          }
        });
// made by malyaj singh 2010991425
        // made by malyaj singh 2010991425
      });
  }
});

app.get("/signinback",function(request,response){
  var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"students"})

    connection.connect(function(errror)
    {
        connection.query("select * from st2 where id=?",[request.query.id],function(errror,results)
        {
            response.render("profile",{results:results})
        })
    })
})
// made by malyaj singh 2010991425
app.post("/signin",function(request,response){
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "students",
      });
    var username = request.body.username;
    var password = request.body.password;
// made by malyaj singh 2010991425
    connection.connect(function (errror) {
        connection.query("select * from st2", function (errror, result) {
          var obj=false;
          var name;
          result.find((o, i) => {
            if (o.username === username && o.password===password) {
              obj=true;
              name=o.fname;
              return true; // stop searching
            }
          });
          if(obj==true){
            console.log("found");
            // response.render("profile",{name:name})
            connection.query("select * from st2 where username='"+username+"'",function(errror,results){
                response.render("profile",{results:results});
                console.log(results);
            })
          }
          else{
            console.log("not found");
            response.render("login copy");
            // made by malyaj singh 2010991425
          }
        });       
      }); 
})

app.get('/logout', function(req, res){
    res.redirect("/")
 });
app.get('/adm', function(req, res){
    res.render("Admin")
 });


app.get('/data', function(request, response){
    var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"students"})

    connection.connect(function(errror)
    {
        connection.query("select * from st2 where id=?",[request.query.id],function(errror,result)
        {
            response.render("display",{result:result})
        })
    })
 });

app.get('/update',function(request,response){
    var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"students"})
    connection.connect(function(errror)
    {
        connection.query("select * from st2 where id=?",[request.query.id],function(errror,result)
        {
            response.render("update",{result:result})
        })
    })
})
app.post("/update_data",function(request,response){
    var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"students"})

    connection.connect(function(errror)
    {
        var password= request.body.password;
        var new_password= request.body.new_password;
        var username=request.body.username;

        connection.query("select * from st2", function (errror, result) {
            var obj=false;
            var name;
            result.find((o, i) => {
              if (o.username === username && o.password===password) {
                obj=true;
                name=o.fname;
                return true; // stop searching
              }
            });
            if(obj==true){
              console.log("found");
              // response.render("profile",{name:name})
              var sql="update st2 set password=?  where username=?"
              connection.query(sql,[new_password,username],function(errror,result)
              {
              response.render("home")
        
        
            })
            }
            else{
              console.log("not found");
              connection.query("select * from st2 where username='"+username+"'",function(errror,result)
        {
            response.render("update copy",{result:result})
        })
            }
          }); 

        
    })
})

app.post("/admin",function(request,response){
  var connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "students",
    });
  var password = request.body.password;

  connection.connect(function (errror) {
      connection.query("select * from st2", function (errror, result) {
        var obj=false;
        if(password==="123"){
          obj=true;
        }
        if(obj==true){
          console.log("found");
          // response.render("profile",{name:name})
          connection.query("select * from st2",function(errror,results){
              response.render("showall",{results:results});
              // console.log(results);
          })
        }
        else{
          console.log("not found");
          response.redirect("/")
        }
      });       
    }); 
})
//routes
app.get("/", function (request, response) {
  response.render("home");
});
app.get("/login", function (request, response) {
  response.render("login");
  // response.sendFile(__dirname+"/login.html");
});
app.get("/signup", function (request, response) {
  response.render("signup");
});
app.listen(3000);

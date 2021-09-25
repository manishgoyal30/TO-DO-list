//all Constant Code

const express = require("express");
const bodyParser = require("body-parser");



const app = express();

var items=["Buy Food","Cook Food","Eat Food"];
var workitems=[];

//Link to ejs
app.set("view engine", "ejs");




//Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

//Set Static path
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function (req, res) {

  let today = new Date();
  
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  let day = today.toLocaleDateString("en-US", options)
  
  

  res.render("list", {listTitle: day, Newlistitem: items});
 
}); 

//form linking

app.post("/", function(req, res){

  let item = req.body.Newitem;

  if(req.body.list === "work") {
    workitems.push(item);
    res.redirect("/work");    
  }else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", Newlistitem: workitems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function () {
  console.log("server started on port 3000");
});
 
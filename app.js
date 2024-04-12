const express = require("express")
const bodyParser = require("body-parser")

const app = express();

let items = []
let workItems =[]

app.use(bodyParser.urlencoded({extended:true}))
app. use(express.static("public"))

app.set('view engine', 'ejs');

app.get("/", function(req, res){
   var today = new Date();
  
   var options ={
    weekday :"long",
    day: "numeric",
    month:"long"
   }
    var day = today.toLocaleDateString("en-US", options)


   res.render("list", {listTitle:day, newListItems: items })
})
app.post("/", function(req, res){

    let item = req.body.newItems

    if (req.body.list === "work" && req.body.list !== "") {
       workItems.push(item) 
       res.redirect("/")
    }
    else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems : workItems })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})

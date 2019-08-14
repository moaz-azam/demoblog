var bodyparser  = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

// const config = require('config');
// //...
//
// if (config.has('optionalFeature.detail')) {
//   const detail = config.get('optionalFeature.detail');
//   //...
// }

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://azamudin:moazazQW@cluster0-kmqrk.mongodb.net/test?retryWrites=true&w=majority")

app.set("view engine", "ejs");
//app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title : String,
    image: String,
    body: String,
    create: {type:Date,  default:Date.now }
});
var  Blog =  mongoose.model("Blog", blogSchema);
//
// Blog.create({
//     title: "first blog",
//     image: "https://unsplash.com/photos/eqFOKASP2ww",
//     body: "irst blog post",
// });
app.get("/blogs",  function(req, res){
    Blog.find({},  function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/",  function(req, res){
    res.redirect("/blogs");
});



app.get("blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    blog.create(req.body.blog, function(err, newblog){
        if (err){
            res.render("new")
        }else {
            res.redirect("/blogs")
        }
    });
});

app.get("blogs/:id", function(req, res){
    Blog.findById(req.params.id,  function(err, foundblog){
        if (err){
            res.redirect("/blogs");
        }else {
            res.render("show", {blog: foundblog});
        }
    });
});


app.listen(process.env.PORT || 3030 );

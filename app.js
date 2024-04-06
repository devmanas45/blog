const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const ejs=require("ejs");
const app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
let posts=[];
const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat sagittis odio, non gravida justo cursus ac. Phasellus eu blandit enim. Sed nec tristique ex, eget eleifend massa. Vestibulum consequat nisi sit amet vestibulum efficitur. Nulla mattis at nisl vel vulputate. Proin ut erat elementum, faucibus urna in, posuere felis."
const aboutPageContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat sagittis odio, non gravida justo cursus ac. Phasellus eu blandit enim. Sed nec tristique ex, eget eleifend massa. Vestibulum consequat nisi sit amet vestibulum efficitur. Nulla mattis at nisl vel vulputate. Proin ut erat elementum, faucibus urna in, posuere felis."
const aboutContactPage="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat sagittis odio, non gravida justo cursus ac. Phasellus eu blandit enim. Sed nec tristique ex, eget eleifend massa. Vestibulum consequat nisi sit amet vestibulum efficitur. Nulla mattis at nisl vel vulputate. Proin ut erat elementum, faucibus urna in, posuere felis."
app.get("/",(req,res)=>{
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
}).get("/about",(req,res)=>{
    res.render("about",{aboutPageContent:aboutPageContent});
}).get("/contact",(req,res)=>{
    res.render("contact",{aboutContactPage:aboutContactPage});
}).get("/compose",(req,res)=>{
    res.render("compose");
}).post("/compose",(req,res)=>{
    const post={
        title:req.body.title,
        composeData:req.body.post,
    };
    posts.push(post);
    res.redirect("/");
    
}).get("/posts/:postName",(req,res)=>{
    const postName=_.lowerCase(req.params.postName);
    posts.forEach((post)=>{
        const storedTitle=_.lowerCase(post.title);
        if(postName===storedTitle){
            res.render("post",{
                title:post.title,
                content:post.composeData
            });
        }
    });
});

app.listen(3000,()=>{
    console.log("The server is running on port 3000");
})

const express=require("express");
const path =require('path');
require('./db/conn');
const UserDetails=require("./models/usermessage.js");
const hbs=require('hbs');
const app=express();
const port = process.env.PORT || 5000;

//setting the path
const static=path.join(__dirname,"../public");
const views=path.join(__dirname,"../templates/views");
const partials=path.join(__dirname,"../templates/partials");

//middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(static));
app.use(express.urlencoded({extended:false}))



//set view engine
app.set("view engine","hbs");
app.set('views',views);
hbs.registerPartials(partials);


app.get("/", (req,res)=>{
    res.status(200).render("index");
})


app.post("/contact", async (req,res)=>{
    try {
        const user=new UserDetails(req.body);
        await user.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(404).send(error);
    }
});


app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})
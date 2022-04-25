const express = require("express");
const Friend = require("./models/friends")
const { default: mongoose } = require("mongoose");
const exphbs = require('express-handlebars')
const hbs = require("hbs")

const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set('view engine', 'hbs');

const   dbURI = "mongodb+srv://ayushpatel:ayushpatel@cluster0.n6quf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true})
    .then((result) => {app.listen(3000)})

app.get("/",(req,res)=>{
    res.render('app')
})
    
app.get('/friends', async(req, res) => {
    const allFriends = await Friend.find({},{_id:0,id:1,name:1});

    res.send(allFriends);
})

app.get('/friends/:id', async(req, res) => {
    const allFriends = await Friend.find({id:req.params.id},{_id:0,id:1,name:1});
    res.send(allFriends)
})

app.post('/friends',async (req, res) => {
    const name = req.body.name;
    const allFriends = await Friend.find();
    let len = allFriends.length
    const friend = new Friend({
        id: len,
        name: name
    })
    friend.save()
    .then((result)=>{
        console.log(result);
        res.redirect("/")
    })
    .catch((err) => console.log(err));
})


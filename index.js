const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));


main()
    .then(()=>{console.log("connection succesfull with db")})
    .catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatter');
}

//index Route
app.get("/chat",  async (req, res)=>{
    let chats= await Chat.find();
    res.render("index.ejs", {chats});
});

app.get("/chats/new",  async (req, res)=>{
    res.render("new.ejs");
});

app.post("/chats", async (req, res)=>{
    let { from, to, msg } = req.body;
    Chat.create({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    res.redirect("http://localhost:8000/chat");
});

app.get("/chats/:id/edit",  async (req, res)=>{
    let {id} = req.params;
    let editable = await Chat.findById(id);
    res.render("edit.ejs", {editable});
});

app.put("/chats/:id",  async (req, res)=>{
    let {id } = req.params;
    let {msg} = req.body;
    let edited = await Chat.findByIdAndUpdate(id, {msg}, {
        returnDocument: 'after',
        runValidators: true,
    });
    console.log(edited);
    res.redirect("http://localhost:8000/chat");
});

// let chat1 = new Chat({
//     from: "Aryan",
//     to: "Saumyadeep",
//     msg:"send message soon please",
//     created_at: new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// });

app.get("/", (req, res)=>{
    res.send("Server running success");
})

app.listen(8000, ()=>{
    console.log("server running on port 8000");
})

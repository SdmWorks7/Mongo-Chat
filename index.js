const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



main()
    .then(()=>{console.log("connection succesfull with db")})
    .catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatter');
}

app.get("/", (req, res)=>{
    res.send("Server running success");
})

app.listen(8000, ()=>{
    console.log("server running on port 8000");
})

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
    .then(()=>{console.log("connection succesfull with db")})
    .catch((err)=>{console.log(err)});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/chatter');
}

Chat.insertMany([
    {
    from: "Aryan",
    to: "Saumyadeep",
    msg:"send message soon please",
    created_at: new Date(),
},
{
    from: "shreyansh",
    to: "Saumyadeep",
    msg:"mayo dede bhai",
    created_at: new Date(),
}
]);
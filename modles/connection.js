import mongoose from "mongoose";

import dotenv from "dotenv";
 //mongoose.connect("mongodb://127.0.0.1:27017/silverpawn");
dotenv.config(); // 🔥 load env file

mongoose.connect(process.env.DB_URL)
 .then(() => console.log("MongoDB Connected"))
 .catch(err => console.log(err));

console.log("Mongodb connected successfully....");




// import mongoose from "mongoose";
// mongoose.connect("mongodb://127.0.0.1:27017/silverpawn");
// console.log("Mongodb connected successfully....");
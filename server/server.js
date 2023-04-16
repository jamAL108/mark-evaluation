import express from "express";
const app = express();
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config({path:"./config.env"});
import Adminrouter from "./router/adminrouter.js";
import FacultyRouter from "./router/facultyrouter.js";
import StudentRouter from "./router/studentrouter.js";
import bodyParser from "body-parser"
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT ||  8000;
const db = process.env.DB;
mongoose.connect(db).then(()=>{
    console.log("success")
}).catch((err)=>{
    console.log(err)
});
app.use("/adminn" , Adminrouter);
app.use("/facult" ,FacultyRouter);
app.use("/stud",StudentRouter);
app.get('/',(req,res)=>{
    res.send("hello");
})
app.listen(port,()=>{
    console.log("started")
})
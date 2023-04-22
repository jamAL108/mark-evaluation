import express from "express";
const router = express.Router();
import {Studentlogn , Updatepassword , Getnotice , Viewfaculty , Getmark , Getattendance , viewattendanc ,Result ,viewdates } from '../controller/studentcont.js';


router.post("/studlogn" , Studentlogn);
router.post("/studpass",Updatepassword);
router.get("/getnoti" , Getnotice);
router.post("/viewfacult" , Viewfaculty);
router.post("/getmarks" , Getmark);
router.post("/overallattend" ,Getattendance);
router.post("/specificattend" ,viewattendanc);
router.post("/getresult",Result);
router.post("/dates",viewdates)
export default router;

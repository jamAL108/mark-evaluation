import express from "express";
const router = express.Router();
import {Studentlogn , Updatepassword , Getnotice , Viewfaculty , Getmark , Getattendance , viewattendance} from '../controller/studentcont.js';


router.post("/studlogn" , Studentlogn);
router.post("/studpass",Updatepassword);
router.get("/getnoti" , Getnotice);
router.post("/viewfacult" , Viewfaculty);
router.post("/getmarks" , Getmark);
router.post("/overallattend" ,Getattendance);
router.post("/specificattend" ,viewattendance );
export default router;

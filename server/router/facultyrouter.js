import express from "express";
const router = express.Router();
import {Facultylogn , Updatepassword , Getnotice , Getstudent , Uploadmark , Studentfetch , Markattendance , Getdefaulter} from '../controller/facultycont.js';


router.post("/facullogn" , Facultylogn);
router.post("/faculpass",Updatepassword);
router.get("/getnoti" , Getnotice);
router.post("/getstud" , Getstudent);
router.post("/uploadmark",Uploadmark);
router.post("/studfetch" , Studentfetch);
router.post("/markattendance" , Markattendance);
router.post("/getdef",Getdefaulter);
export default router;
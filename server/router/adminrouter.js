import express from "express";
import { AdminLogin , Changeper , Addfaculty ,
    Addstudent ,
    Addnotice , 
    Ourfaculty , 
    Ourstudent ,
    Addsubject , 
    Getsubject , 
    Initiateclass,
    monthlydefaulter ,
    Upgradeyear , 
    getcc,Result
} from "../controller/admincont.js";

const router = express.Router();

router.post("/login",AdminLogin);
router.post("/changeper",Changeper);
router.post("/adfacul" ,  Addfaculty);
router.post("/adstud",  Addstudent);
router.post("/adnotic", Addnotice);
router.post("/ourfacul", Ourfaculty);
router.post("/ourstud", Ourstudent);
router.post("/adsubj", Addsubject);
router.post("/getsubj", Getsubject);
router.post("/Initiate" , Initiateclass);
router.post("/generatedef" ,monthlydefaulter);
router.get("/upgradeyr" , Upgradeyear);
router.post("/ourcc" ,getcc);
router.get("/result",Result);
export default router;
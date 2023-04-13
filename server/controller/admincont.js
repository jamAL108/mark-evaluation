import FacultySetUp from "../models/faculty.js";
import StudentSetUp from "../models/student.js";
import Createnotice from "../models/notice.js";
import Subjects from "../models/subject.js";
import bcrypt from "bcryptjs";
import attendance from "../models/attendance.js";
import attenddates from "../models/attend_dates.js";
import defaulter from "../models/defaulter.js";
import alumini from "../models/alumini.js";
import prevsemdata from "../models/prevsemdata.js";
import result from "../models/result.js";
import examination from "../models/examination.js";
import ccss from "../models/cc.js";
import mongoose from 'mongoose';


export const Addfaculty = async (req,res)=>{
  const errors={BackendError:String , emailerror:String}
    try{  
    const data = req.body;
    const {name , Gender , age , email , department , password} = req.body;
    console.log(data);
    const existingfaculty = await FacultySetUp.findOne({email});
    console.log(existingfaculty);
    if(existingfaculty){
       errors.emailerror = "email already exits";
       res.status(300).send({error:errors})
    }else{
      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    const user = await  new FacultySetUp(data);
     await user.save();
    await user.save();
      res.status(200).send({message:"faculty added successfully",success:true,response:data})
    }
    }catch (e){
      errors.BackendError=e;
      res.status(400).send({error:errors})
    }
};

export const Addstudent = async (req,res)=>{
  try{  
  const errors={BackendError:String , rollnoerror:String}
  const data = req.body;
  console.log(data);
  const {  name,
  Gender,
  dob,
  Rollno,
  depart,
  year,
  email,
  division,
  batch,password} = req.body;
  const existingstudent = await StudentSetUp.findOne({Rollno});
  if(!existingstudent){
    let hashedPassword;
    hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;
    const user = await new StudentSetUp(data);
    console.log(user);
    await user.save();
      return res.status(200).send({message:"student added successfully",success:true,response:data})
  }else{
    errors.rollnoerror = "rollno already exits";
   return res.status(300).send({error:errors})
  }
  }catch (e) {
    errors.BackendError=e;
    return res.status(400).send({error:errors})
  }
};

export const Addnotice = async (req,res)=>{
  const errors ={Backenderror:String,emailerror:String}
  try{
       console.log("hello");
       const data = req.body;
       console.log(data);
       const notice = await new Createnotice(data);
       await notice.save();
       console.log("done");
       return res.status(200).send({message:"notice added" , success:"OK" , response:notice});
  }catch(err){
    errors.Backenderror = "backend error";
    return res.status(404).send({error:errors});
  }
}



export const Addsubject = async (req,res)=>{
  const errors ={backenderror:String, subjecterror:String}
  try{
       const data = req.body;
       console.log(data);
       const {depart , year , subjectName , subjectCode} = req.body;
       
       const existingsubject = await Subjects.findOne({depart , year , subjectName})
       if(existingsubject){
        errors.subjecterror="subject already exist";
         return res.status(404).send({error:errors});
       }
       const sub = await new Subjects(data);
       await sub.save();
       console.log("done");
       return res.status(200).send({message:"subject added" , success:"OK" , response:sub});
  }catch(err){
    errors.backenderror = "backend error";
    return res.status(404).send({error:errors});
  }
}

export const Getsubject = async (req,res)=>{
  const errors ={backenderror:String, subjecterror:String}
  try{
       const {depart} = req.body;
       console.log(depart);
       const subjects = await Subjects.find({depart})
       if(!subjects){
        errors.subjecterror="no subject exists in this department please add more ";
         return res.status(404).send({error:errors});
       }
       
       console.log("done");
       return res.status(200).send({message:"subject received" , success:"OK" , response:subjects});
  }catch(err){
    errors.backenderror = "backend error";
    return res.status(404).send({error:errors});
  }
}

export const getcc = async(req,res)=>{
  const errors = {backenderror:String }
  try{
    const {depart} = req.body;
    const ccs = await ccss.find({depart:depart});
    return res.status(200).send({message:"take cc" , ccs:ccs})
  }catch(err){
    errors.backenderror = "backend error";
    return res.status(404).send({error:errors});
  }
}


export const Initiateclass = async(req,res)=>{
   const errors = {backenderror:String , initiateerror:String , limiterror:String}
   try{
      const {temp , ccs } = req.body;
      console.log(temp);
      console.log(ccs);
      const data = await FacultySetUp.findOne({email:temp.email})
      console.log(data);
      const subj = await Subjects.findOne({subjectName:temp.subject})
      if( ccs === true){
        const obj ={
          faculty:data._id,
          name:data.name,
          division:temp.division,
          year:temp.year,
          depart:data.depart
        }
        const user = new ccss(obj);
        await user.save();
        console.log(user);
      }
      if(data.class.length!==0){
        var i=0;
          const existingsubject = await FacultySetUp.findOne({class:{$elemMatch:{division:temp.division , subject:temp.subject}}})
          if(existingsubject){
            errors.initiateerror="the faculty has already been aassigned to this subject in respective division"
            return res.status(404).send({error:errors})
      }else{
        if(temp.attempts>0){
          let sort = 0;
          if(ccs===true){
            sort=1;
          }
        const obj = {
          year:temp.year , division:temp.division , subject:temp.subject , practical:subj.practical , sort:sort
        }
        data.class.push(obj);
        data.attempts=data.attempts-1;
        await data.save();
        return res.status(200).send({message:"done" , response:data})
      }else{
        errors.limiterror = "you cant add more classes to this faculty limit exceeded"
        return res.status(404).send({error:errors})
      }
    }
    }else{
      let sort = 0;
          if(ccs===true){
            sort=1;
          }
      const obj = {
        year:temp.year , division:temp.division , subject:temp.subject , practical:subj.practical , sort:sort
      }
      data.class.push(obj);
      data.attempts=data.attempts-1;
      await data.save();
      return res.status(200).send({message:"done" , response:data})
    }
   }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
   }

}


export const Ourfaculty =async(req,res)=>{
  const errors ={facultynotfound:String , backenderror:String}
  try{
    console.log("hi from our faculty");
    console.log(req.body);
    const {depart } = req.body;
    console.log(depart);
    const data = await FacultySetUp.find({depart});
    console.log(data);
    const ccs = await ccss.find({depart:depart});
    console.log(ccs);
    if(!data){
      errors.facultynotfound="no faculty exits in this department";
      return res.status(400).send({error:errors})
    }else{
      console.log("hello");
      return res.status(200).send({message:"faculty found" , response:data , ccs:ccs})
    }
  }catch(err){
    console.log(err);
    errors.backenderror=err;
    res.status(404).send({error:errors})
  }
};



export const Ourstudent =async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{
    const {year, depart , division} = req.body;
    console.log(year);
    const data = await StudentSetUp.find({year ,depart , division});
    if(!data){
      errors.facultynotfound="no student exits in this division";
      return res.status(400).send({error:errors})
    }else{
      console.log(data);
      return res.status(200).send({message:"student found" , response:data})
    }
  }catch(err){
    console.log(err);
    errors.backenderror=err;
    res.status(404).send({error:errors})
  }
};


export const monthlydefaulter = async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{
    await defaulter.deleteMany({});
    const data = req.body;
     const date = new Date();
     let month = date.getMonth()+1;
     let moon ;
     if(month===1){
        moon=12;
     }else{
      moon=month-1;
     }
    let depart=["MECH" , "IT" , "CSE" , "ECE"];
    let divi=["A","B","C"];
    for(var i=1;i<=4;i++){
      for(var j=0;j<=3;j++){
        for(var m=0;m<3;m++){
    const students = await StudentSetUp.find({year:i , depart:depart[j] , division:divi[m]})
    const dee =[];
    if(students.length!==0 && students.length!==1){
      const subjects = await Subjects.find({depart:depart[j] , year:i});
      const obbj ={
        year:i,
        division:divi[m],
        depart:depart[j],
        month:moon,
        defaulter:dee,
        status:false
      }
          const neew = new defaulter(obbj);
          await neew.save();
          const deff = await defaulter.findOne({year:i,division:divi[m],
            depart:depart[j]});
            let array=[];
         for(var z=0;z<students.length;z++){
          let sum =0;
         for(var p=0;p<subjects.length;p++){
          const lecturecount = await attendance.findOne({depart:depart[j] , year:i , division:divi[m] , subject:subjects[p]._id , student:students[z]._id})
              const totallec = lecturecount.totalLecturesByFaculty[moon].value;
              const lecattended = lecturecount.lectureAttended[moon].value;
              const percen = (lecattended/totallec)*100;
              sum=sum+percen; 
          }
          const avg = sum/subjects.length;
          if(avg<data.per){
            const obj={
              _id:students[z]._id,
              name:students[z].name,
              Rollno:students[z].Rollno,
              percent:avg
            }
            array.push(obj);
          }
         }
         await defaulter.findByIdAndUpdate({_id:deff._id},{$set:{defaulter:array,status:true}});
        }
    }
    } 
    }
       await defaulter.deleteMany({status:false});
       const deffo = await defaulter.find({status:true});
       return res.status(200).send({response:deffo});
  }catch(err){
    errors.backenderror=err;
    console.log(err);
   return res.status(404).send({error:errors})
  }
};


export const otp = async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{
      
  }catch(err){
    errors.backenderror=err;
    return res.status(404).send({error:errors})
  }
};


// export const result = async(req,res)=>{
//   const errors ={marknotentered:String , backenderror:String}
//   try{
     
//   }catch(err){
//     errors.backenderror=err;
//     return res.status(404).send({error:errors})
//   }
// };


export const Upgradeyear = async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{
    //attendance date
    const dell = await attenddates.deleteMany({});

    //faculty
    const faculty = await FacultySetUp.find({});
    for(var p=0;p<faculty.length;p++){
      const facul = await FacultySetUp.findOne({_id:faculty[p]._id});
      facul.class=[];
      facul.attempts=5;
      await facul.save();
    }

    //defaulter
    const deldef = await defaulter.deleteMany({});

    //students
    for(var i=1;i<=4;i++){
     const students = await StudentSetUp.find({year:i});
     let array=[];
     //attendances
     const del = await attendance.deleteMany({year:i});
     if(i===4){
      if(students.length!==0){
      const date = new Date();
      const year = date.getyear();
      await StudentSetUp.deleteMany({year:i});
      for(var j=0;j<students.length;j++){
          const user = new alumini({
            name:students[j].name,
            Gender:students[j].Gender,
            dob:students[j].dob,
            Rollno:students[j].Rollno,
            depart:students[j].depart,
            batch:year
          })
          await user.save();
      }
    }
     }else{
       for(var k=0;k<students.length;k++){
        const update = await StudentSetUp.findByIdAndUpdate({_id:students[k]._id} , {$set:{year:i+1}})
        array.push(update);
       }
     }
     return res.status(200).send({message:"upgraded" , response:array});
    }
  }catch(err){
    errors.backenderror=err;
   return res.status(404).send({error:errors})
  }
};



export const changetoodd = async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{
    let arra=[];
        //result changing
      for(var i=2;i<=4;i++){
      const students = await StudentSetUp.find({year:i})
      if(students){
      for(var j=0;j<students.length;i++){
        

        //examination deletion
      const examdel = await examination.deleteMany({student:students[j]._id})
        const result = await result.findOne({student:students[j]._id})
        const prevdata = await prevsemdata.find({student:students[j]._id})
        if(!prevdata){
          const data = new prevsemdata({
            student:students[j]._id,
            result:[],
            kts:[]
          })
          await data.save();
        }
        let sem=0;
        if(i===2){
            sem=2;
        }else if(i===3){
          sem=4;
        }else if(i===4){
          sem=6;
        }
        const obj ={
          sem:sem,
          result:result
        }
        const prev =await prevsemdata.findOne({student:students._id})
        prev.result.push(obj);
        if(result.kt>0){
          const obj1 ={
            sem:sem,
            kt:result.kt,
            ktsubject:result.ktsubject
          }
          prev.kts.push(obj1);
        }
        await prev.save();
        arra.push(prev);
      }
    }
      }
      const deeelte = await result.deleteMany({});
      return res.status(200).send({message:"done" , response:prev})
  }catch(err){
    errors.backenderror=err;
    return res.status(404).send({error:errors})
  }
};

export const changetoeven = async(req,res)=>{
  const errors ={studentnotfound:String , backenderror:String}
  try{

     //attendance date
    const dell = await attenddates.deleteMany({});
    //faculty
    const faculty = await FacultySetUp.find({});
    for(var p=0;p<faculty.length;p++){
      const facul = await FacultySetUp.findOne({_id:faculty[p]._id});
      facul.class=[];
      facul.attempts=5;
      await facul.save();
    }
    //defaulter
    const deldef = await defaulter.deleteMany({});

    //result copying
    for(var i=1;i<=4;i++){
      const students = await StudentSetUp.find({year:i})
      if(students){
      for(var j=0;j<students.length;i++){
      //attendances one line
     const del = await attendance.deleteMany({year:i});
     //examination delete
     const examdel = await examination.deleteMany({student:students[j]._id})
        const result = await result.findOne({student:students[j]._id})
        const prevdata = await prevsemdata.find({student:students[j]._id})
        if(!prevdata){
          const data = new prevsemdata({
            student:students[j]._id,
            result:[],
            kts:[]
          })
          await data.save();
        }
        let sem=0;
        if(i===1){
          sem=1;
        }else if(i===2){
            sem=3;
        }else if(i===3){
          sem=5;
        }else if(i===4){
          sem=7;
        }
        const obj ={
          sem:sem,
          result:result
        }
        const prev =await prevsemdata.findOne({student:students[j]._id})
        prev.result.push(obj);
        if(result.kt>0){
          const obj1 ={
            sem:sem,
            kt:result.kt,
            ktsubject:result.ktsubject
          }
          prev.kts.push(obj1);
        }
        await prev.save();
        arra.push(prev);
      }
    }
      }
      const deeelte = await result.deleteMany({});
      return res.status(200).send({message:"done" , response:prev})
  }catch(err){
    errors.backenderror=err;
    return res.status(404).send({error:errors})
  }
};


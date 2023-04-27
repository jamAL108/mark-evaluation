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
import cc from "../models/cc.js";
import admin from '../models/admin.js';
import otherinfos from "../models/otherinfos.js";
import Results from "../models/result.js";

export const AdminLogin = async(req,res)=>{
  const errors={passwordError:String , emailError:String , backenderror:String}
  try{
    const { email, password} = req.body;
    const data =   
    await admin.findOne({email})
    if(!data){
      errors.emailError="email doesnt exits";
      return  res.status(404).send({error:errors});
     }
    const passwordcorrect =   
    await admin.findOne({email,password})
   if(passwordcorrect){
    const daatas = await otherinfos.findOne({});
    return res.status(200).send({message:"login successfull" , response:daatas});
    }else if(!passwordcorrect){
      errors.passwordError="invalid credentials";
      return res.status(404).send({error:errors});
    }
  }catch(err){
       errors.backenderror=e;
       res.status(400).send({error:errors})
  }
}

export const Changeper = async(req,res)=>{
  const errors={backenderror:String , emailerror:String}
  try{
     const {percent} = req.body;
     const data = await otherinfos.findOne({});
     data.defpercent=percent;
     await data.save();
     console.log(data);
  }catch(err){
    errors.backenderror=e;
    res.status(400).send({error:errors})
  }
};

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
  const errors={BackendError:String , rollnoerror:String}
  try{  
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
       const notice =  new Createnotice(data);
       await notice.save();
       console.log("done");
       return res.status(200).send({message:"notice added" , success:"OK" , response:notice});
  }catch(err){
    console.log(err);
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
    const value = req.body;
    console.log("nksjbjv");
    const ccs = await ccss.find({depart:value.depart});
    console.log(ccs);
    return res.status(200).send({message:"take cc" , ccs:ccs})
  }catch(err){
    errors.backenderror = "backend error";
    console.log(err);
    return res.status(404).send({error:errors});
  }
}


export const Initiateclass = async(req,res)=>{
   const errors = {backenderror:String , initiateerror:String , limiterror:String}
   try{
      const {temp , ccs , value } = req.body;
      console.log(value.depart);
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
          depart:value.depart
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
    const {depart } = req.body;
    const data = await FacultySetUp.find({depart});
    const ccs = await ccss.find({depart:depart});

    if(!data){
      errors.facultynotfound="no faculty exits in this department";
      return res.status(400).send({error:errors})
    }else{
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
    const { per } = req.body;
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
    if(students.length!==0 && divi[m]==="C"){
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
          const lecturecount = await attendance.findOne({depart:depart[j] , year:i , division:divi[m] , subject:subjects[p]._id , student:students[z]._id});
              const totallec = lecturecount.totalLecturesByFaculty[moon].value;
              const lecattended = lecturecount.lectureAttended[moon].value;
              const percen = (lecattended/totallec)*100;
              sum=sum+percen; 
          }
          const avg = sum/subjects.length;
          console.log(per);
          if(avg<per){
            console.log("hubce");
            const obj={
              _id:students[z]._id,
              name:students[z].name,
              Rollno:students[z].Rollno,
              percent:avg
            }
            array.push(obj);
          }
         }
         console.log(array);
         await defaulter.findByIdAndUpdate({_id:deff._id},{$set:{defaulter:array,status:true}});
        }
    }
    } 
    }
       await defaulter.deleteMany({status:false});
       const deffo = await defaulter.find({status:true});
       console.log(deffo);
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
      facul.attempts=4;
      await facul.save();
    }

    await cc.deleteMany({});

    //defaulter
    const deldef = await defaulter.deleteMany({});
    let array=[];

    //students
    for(var i=1;i<=4;i++){
      const year = Number(i);
      console.log(year);
     const students = await StudentSetUp.find({year:2});
     console.log(students);

     //attendances
     const del = await attendance.deleteMany({year:i});
     if(i===4){
      if(students.length!==0){
      const date = new Date();
      const yer = date.getYear();
      await StudentSetUp.deleteMany({year:i});
      for(var j=0;j<students.length;j++){
          const user = new alumini({
            name:students[j].name,
            Gender:students[j].Gender,
            dob:students[j].dob,
            Rollno:students[j].Rollno,
            depart:students[j].depart,
            batch:yer
          })
          await user.save();
      }
    }
     }else{
       for(var k=0;k<students.length;k++){
        console.log("njfkevnej");
        const updae = await StudentSetUp.findByIdAndUpdate({_id:students[k]._id} , {$set:{year:i}})
        console.log(updae);
        console.log("fuck u");
        array.push(updae);
       }
     }
    }
     console.log(array);
     return res.status(200).send({message:"upgraded" , response:array});

  }catch(err){
    errors.backenderror=err;
    console.log(err);
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


export const Result = async(req,res)=>{
  const errors ={resulterror:String , backenderror:String}
  try{
    console.log("heeeeyyy");
    await Results.deleteMany({});
    const studres=[];
    const departarray=["MECH","IT","CSE","ECE"];
    const divi=["A","B","C"];
        const students = await StudentSetUp.find({year:2,depart:"CSE",division:"C"});
        const subjects = await Subjects.find({depart:"CSE",year:2});
        if(students.length!==0){
        for(var k=0;k<students.length;k++){
          console.log(students[k]);
          const result={
             grandtotal:0,
             totalcredit:0,
             totalCxG:0,
             SGPI:0,
             listofkt:[],
             kt:false,
             subjects:[],
             practical:[]
          }
           for(var m=0;m<subjects.length;m++){
              const subj1={
                 subjectname:subjects[m].subjectName,
                 subjectCode:subjects[m].subjectCode,
                 practical:subjects[m].practical,
                 credits:0,
                 theory:{
                  ESE:{
                    marks:0,
                    grade:"",
                    minimummarks:0,
                    maximummarks:0,
                    kt:false
                  },
                  IA:{
                    marks:0,
                    grade:"",
                    minimummarks:0,
                    maximummarks:0,
                    kt:false
                  },
                  MSE:{
                    marks:0,
                    grade:"",
                    minimummarks:0,
                    maximummarks:0,
                    kt:false
                  },
                  total:{
                    marks:0,
                    grade:"",
                    maximummarks:0,
                    kt:false
                  },
                 gradepoint:0,
                 CxG:0
                },
                practical:{
                  termwork:{
                    marks:0,
                    grade:"",
                    minimummarks:0,
                    maximummarks:0,
                  },
                  orals:{
                    marks:0,
                    grade:"",
                    minimummarks:0,
                    maximummarks:0,
                  },
                  total:{
                    marks:0,
                    grade:"",
                    maximummarks:0,
                  },
                  gradepoint:0,
                  CxG:0
                }
              }
              console.log(subj1);
              const data = await examination.find({student:students[k]._id ,subjectCode:subjects[m].subjectCode });
              console.log(data.length);
              for(var l=0;l<data.length;l++){
                if(data[l].exam==="CREDITS"){
                  subj1.credits=data[l].credits;
                  result.totalcredit+=subj1.credits;
                }else if(data[l].exam==="IA"){
                  subj1.theory.IA.marks=data[l].mark;
                  if(data[l].mark<8){
                    result.kt=true;
                      console.log(result.theory.ESE.kt);
                      subj1.theory.IA.kt=true;
                      subj1.theory.total.kt=true;
                      const obj={
                        subject:subjects[m].subjectName,
                        marks:data[l].mark
                      }
                      result.listofkt.push(obj);
                  }
                  const perr = (data[l].mark/20)*100;
                  const per = Number((perr).toFixed(2))
                  subj1.theory.IA.grade=percentage(per);
                  subj1.theory.IA.minimummarks=8;
                  subj1.theory.IA.maximummarks=20;
                  console.log("nkusbw");
                }else if(data[l].exam==="MIDSEM"){
                  subj1.theory.MSE.marks=data[l].mark;
                  if(data[l].mark<8){
                    result.kt=true;
                      subj1.theory.MSE.kt=true;
                      subj1.theory.total.kt=true;
                      const obj={
                        subject:subjects[m].subjectName,
                        marks:data[l].mark
                      }
                      result.listofkt.push(obj);
                  }
                  const perr = (data[l].mark/20)*100;
                  const per = Number((perr).toFixed(2))
                  subj1.theory.MSE.grade=percentage(per);
                  subj1.theory.MSE.minimummarks=8;
                  subj1.theory.MSE.maximummarks=20;
                }else if(data[l].exam==="ENDSEM"){
                  subj1.theory.ESE.marks=data[l].mark;
                  if(data[l].mark<24){
                      result.kt=true;
                      subj1.theory.ESE.kt=true;
                      subj1.theory.total.kt=true;
                      const obj={
                        subject:subjects[m].subjectName,
                        marks:data[l].mark
                      }
                      result.listofkt.push(obj);
                  }
                  console.log("nkuvbw");
                  const perr = (data[l].mark/60)*100;
                  const per = Number((perr).toFixed(2))
                  subj1.theory.ESE.grade=percentage(per);
                  subj1.theory.ESE.minimummarks=24;
                  subj1.theory.ESE.maximummarks=60;
                }else if(data[l].exam==="PRACTICAL"){
                  const attendanc = await attendance.findOne({student:students[k]._id ,subject:subjects[m]._id});
                  let lecattend=0;
                  let overallec=0;
                  for(var z=0;z<12;z++){
                    lecattend+=attendanc.lectureAttended[z].value;
                    overallec+=attendanc.totalLecturesByFaculty[z].value;
                  }
                  const perrr = (lecattend/overallec)*100;
                  const evaluation = (perrr/100)*25;
                  console.log("uywyef");
                  const termw = (evaluation+data[l].termwork)/2;
                  subj1.practical.termwork.marks=termw;
                  const perr = (termw/25)*100;
                  const per = Number((perr).toFixed(2))
                  subj1.practical.termwork.grade=percentage(per);
                  subj1.practical.termwork.minimummarks=10;
                  subj1.practical.termwork.maximummarks=25;

                  subj1.practical.orals.marks=data[l].orals;
                  const percent = (termw/25)*100;
                  const perc = Number((percent).toFixed(2))
                  subj1.practical.orals.grade=percentage(perc);
                  subj1.practical.orals.minimummarks=10;
                  subj1.practical.orals.maximummarks=25;

                   const total = termw+data[l].orals;
                   subj1.practical.total.marks=total;
                   subj1.practical.total.maximummarks=50;
                   result.grandtotal+=total;
                   const percentt = (termw/50)*100;
                  const pe = Number((percentt).toFixed(2))
                  subj1.practical.total.grade=percentage(pe);
                  console.log("nwiyevfw");
                  subj1.practical.gradepoint=grade(subj1.practical.total.grade);
                  subj1.practical.CxG=subj1.practical.gradepoint*2;
                  result.totalCxG+=subj1.practical.CxG;
                }
              }
              const total = subj1.theory.IA.marks + subj1.theory.MSE.marks + subj1.theory.ESE.marks
              subj1.theory.total.marks=total;
              subj1.theory.total.maximummarks=100;
              result.grandtotal+=total;
              const perr = (total/100)*100;
              const per = Number((perr).toFixed(2))
              subj1.theory.total.grade=percentage(per);
              console.log("mwoi");
              subj1.theory.gradepoint = grade(subj1.theory.total.grade);
              subj1.theory.CxG=subj1.theory.gradepoint*subj1.credits;
              /////////
              result.totalCxG+=subj1.theory.CxG;
              const subb ={
                 subjectname:subjects[m].subjectName,
                 subjectCode:subjects[m].subjectCode,
                 credits:subj1.credits,
                 theory:subj1.theory
              }
              result.subjects.push(subb);
              if(subjects[m].practical===true){
                const prac={
                subjectname:subjects[m].subjectName,
                 subjectCode:subjects[m].subjectCode,
                 credits:2,
                 practical:subj1.practical
                }
                console.log(prac);
                result.practical.push(prac);
              }
           }
           if(result.kt===false){
              const totalsubj = subjects.length*100;
              const per = (result.grandtotal/totalsubj)*100;
              if(per>10){
                result.SGPI=10;
              }else{
              result.SGPI=(per/9.5);
              }
           }
           studres.push(result);
           const infoo = new Results({
            student:students[k]._id,
            grandtotal:result.grandtotal,
            totalcredit:result.totalcredit,
            totalCxG:result.totalCxG,
            totalsubject:subjects.length,
            SGPI:result.SGPI,
            listofkt:result.listofkt,
            kt:result.kt,
            subjects:result.subjects,
            practical:result.practical
           })
           await infoo.save();
        }
      }
     return res.status(200).send({message:"DONE",response:studres});
  }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};


const grade=(grad)=>{
  if(grad==="O"){
    return 10;
  }else if(grad==="A"){
    return 9;
  }else if(grad==="B"){
    return 8;
  }else if(grad==="C"){
    return 7;
  }else if(grad==="D"){
    return 6;
  }else if(grad==="E"){
    return 5;
  }else if(grad==="P"){
    return 4;
  }else if(grad==="F"){
    return 0;
  }
}


const percentage =(per)=>{
  if(per>=80.00){
    return "O";
  }else if(per<79.99 && per>75.00){
    return "A";
  }else if(per<74.99 && per>70.00){
    return "B";
  }else if(per<69.99 && per>60.00){
    return "C";
  }else if(per<59.99 && per>50.00){
    return "D";
  }else if(per<49.99 && per>45.00){
    return "E";
  }else if(per<49.99 && per>40.00){
    return "P";
  }else{
   return "F";
  }
}


import Student from "../models/student.js";
import Notice from '../models/notice.js';
import Faculty from '../models/faculty.js';
import bcrypt from "bcryptjs"
import Examination from "../models/examination.js";
import Subjects from "../models/subject.js";
import attendance from "../models/attendance.js";
import attenddates from '../models/attend_dates.js';
import Results from "../models/result.js";
 export const Studentlogn = async(req,res)=>{
  const errors={passwordError:String , emailError:String , backenderror:String}
    try{
      const { Rollno, password} = req.body;
      const data =   
      await Student.findOne({Rollno})
      if(!data){
        errors.rollnoError="rollno doesnt exits";
        return  res.status(404).send({error:errors});
       }
      const passwordcorrect = await bcrypt.compare(password , data.password);
     if(passwordcorrect){
      return res.status(200).send({message:"login successfull" , response:data});
      }else if(!passwordcorrect){
        errors.passwordError="invalid credentials";
        return res.status(404).send({error:errors});
      }
    }catch(err){
      errors.backenderror=err;
      console.log(err);
      return res.status(404).send({error:errors})
    }
};

export const Updatepassword = async(req,res)=>{
  const errors ={passworderror:String , backenderror:String}
    try{
        console.log(req.body);
         const {Rollno,newpassword , confirmpassword } = req.body;
       if(newpassword!==confirmpassword){
          errors.passworderror = "Your password and confirmation password do not match";
          return res.status(400).send({error:errors})
       }
       
      const data = await Student.findOne({ Rollno });
      console.log(data);
       let hashedPassword;
       hashedPassword = await bcrypt.hash(newpassword, 10);
       data.password = hashedPassword;
       if(data.passwordupdated===false){
        data.passwordupdated=true;
     }
        await data.save();

        const data1 = await Student.findOne({ Rollno });
        console.log(data1);
           return res.status(200).send({
            success: true,
            message: "Password updated successfully",
            response: data,
          });
    }catch(err){
      errors.backenderror = err;
      return res.status(404).send({error:errors})
    }
};


export const Getnotice =async(req,res)=>{
  const errors = {backenderror:String , noticeerror:String}
  try{
       const data = await Notice.find({too:{ $in: ["Students", "All"] }})
       if(data.length===0){
        errors.noticeerror = "no notice have being released in recent days"
        return res.status(404).send({error:errors})
       }
        console.log(data);
        return res.status(200).send({message:"notice fetched" , response:data})

  }catch(err){
    errors.backenderror=err;
    return res.status(404).send({error:errors})
  }
};


export const Viewfaculty = async(req,res)=>{
   let errors = {backenderror:"" , facultyerror:""}
   try{
       const {division , year} = req.body;
       console.log(req.body);
          const data = await Faculty.find({class:{$elemMatch:{division:division , year:year}}})
          if(data.length===0){
            errors.facultyerror="no faculty assigned yet pleae contact admin....!";
            console.log( errors.facultyerror);
            return res.status(404).send({error:errors})
          }else{
          const resp=[];
          let obj1={};
           for(var i =0;i<data.length;i++){
            console.log("inside for loop");
               console.log(data[i]);
               const temp = data[i].class;
              let obj ={name :data[i].name , email:data[i].email}
              for(var j =0;j<temp.length;j++){
                if(data[i].class[j].division ===division){
                    obj1 = Object.assign(obj,{subject:temp[j].subject});
                }
              }
              resp.push(obj1);
           }
            return res.status(200).send({message:"faculty received" , response:resp})
          }
   }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
   }
};


export const Getmark = async(req,res)=>{
  const errors = {backenderror:String , markerror:String}
  try{
     const data = req.body;
     console.log(data);
      const marks = await Examination.find({student:data._id ,  depart:data.depart , exam:data.exam })
      console.log(marks);
      if(marks.length===0){
          errors.markerror="marks have not yet uploaded ....!"
          return res.status(404).send({error:errors})
      }else{
        var totalmark=0;
        if(data.exam==="IA"){
           totalmark=20;
        }else if(data.exam==="MIDSEM"){
          totalmark=20;
        }else if(data.exam==="PRACTICAL"){
          totalmark=10;
        }else if(data.exam==="ENDSEM"){
          totalmark=60;
        }
        let array=[];
        for(var i=0;i<marks.length;i++){
          const subjet = await Subjects.find({subjectCode:marks[i].subjectCode});
            const obj ={
              subject:subjet[0].subjectName,
              subjectCode:marks[i].subjectCode,
              mark:marks[i].mark,
              totalmark:totalmark
            }
            array.push(obj);
        }
        console.log(array);
        return res.status(200).send({message:"amrk sended" , response:array})
      }
    }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};

export const Getattendance = async(req,res)=>{
  console.log("Hellooo");
  const errors = {backenderror:String , atterror:String}
  try{
     const data = req.body;
     const student = await Student.findOne({_id:data._id})
     const subjects = await Subjects.find({depart:data.depart , year:data.year})
     if(!subjects){
      const obj = {
        percentage:0,
        overrallec:"--",
        lectureattended:"--"
       }
      return res.status(404).send({error:obj})
     }
     let lecattend =0;
     let totallec=0;
     for(var i=0;i<subjects.length;i++){
        const atte = await attendance.findOne({student:data._id , subject:subjects[i]._id})
        console.log(atte);
        console.log("HEEEELOO");
        console.log(subjects[i].subjectName);
        if(atte){
        for(var j=0;j<12;j++){
          totallec=totallec+atte.totalLecturesByFaculty[j].value;
          lecattend=lecattend+atte.lectureAttended[j].value;
        }
      }
        console.log("wanakam");
     }
     console.log(totallec);
     console.log(lecattend);
     let final = (lecattend/totallec)*100;
     console.log(final);
     const obj = {
      percentage:final,
      overrallec:totallec,
      lectureattended:lecattend
     }
     return res.status(200).send({message:"take the fucking percentage" , response:obj})
  }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};

export const viewattendanc = async(req,res)=>{
  const errors = {backenderror:String , atterror:String}
  try{
     const data = req.body;
     const student = await Student.findOne({_id:data._id})
     const subjects = await Subjects.find({depart:data.depart , year:data.year});
     ///overall
     let overal=[];
     for(var i=0;i<subjects.length;i++){
const attee = await attendance.find({student:data._id , subject:subjects[i]._id});
const atte = attee[0];
      let totallec=0;
      let attended=0;
      if(atte){
      for(var j=0;j<12;j++){
         totallec+=atte.totalLecturesByFaculty[j].value;
         attended+=atte.lectureAttended[j].value;
      }
      let percentage= (attended/totallec)*100;
      const obj={
        _id:atte._id,
        subject:subjects[i].subjectName,
        subjectCode:subjects[i].subjectCode,
        totallec:totallec,
        attended:attended,
        percentage:percentage
      }
      overal.push(obj);
    }
     }
     ////monthly 
     let monthly=[];
     for(var m=0;m<12;m++){
      let temp=[];
        for(var p=0;p<subjects.length;p++){
            const atte = await attendance.findOne({student:data._id , subject:subjects[p]._id});
            let percentage= (atte.lectureAttended[m].value/atte.totalLecturesByFaculty[m].value)*100;
             const obj={
              _id:atte._id,
              subject:subjects[p].subjectName,
              subjectCode:subjects[p].subjectCode,
              totallec:atte.totalLecturesByFaculty[m].value,
              attended:atte.lectureAttended[m].value,
              percentage:percentage
             }
             temp.push(obj);
        }
        monthly.push(temp);
     }
     console.log(monthly);
     console.log(overal);
     return res.status(200).send({message:"sended",month:monthly , overall:overal});
  }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
}

export const viewdates = async(req,res)=>{
  const errors = {backenderror:String , atterror:String}
  try{
      const data =req.body;
      const subjects = await Subjects.find({depart:data.depart , year:data.year})
      let curmonth=[];
      let prevmonth=[];
      for(var i=0;i<subjects.length;i++){
        console.log(subjects[i].subjectName);
         const date = new Date();
        const month = date.getMonth()+1;
 const vaari = await attendance.find({student:data._id , subject:subjects[i]._id});
const vaar=vaari[0];
console.log(vaar._id);
console.log(month);
   const curdates = await attenddates.find({attendance:vaar._id , month});
         const subj1={
          subjectname:subjects[i].subjectName,
          subjectcode:subjects[i].subjectCode,
          dates:curdates
         }
         curmonth.push(subj1);
         const prevdates = await attenddates.find({attendance:vaar._id , month:month-1});
         const subj2={
          subjectname:subjects[i].subjectName,
          subjectcode:subjects[i].subjectCode,
          dates:prevdates
         }
         prevmonth.push(subj2);
      }
      return res.status(200).send({message:"sended",curmonth:curmonth,prevmonth:prevmonth});
      }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};


export const Result = async(req,res)=>{
  const errors = {backenderror:String , resulterror:String}
   try{
    console.log(req.body);
      const {_id} = req.body;
      const result = await Results.findOne({student:_id});
      console.log(result);
      if(!result){
        errors.resulterror="You're result in not yet generated .....!"
        return res.status(404).send({error:errors});
      }
      return res.status(200).send({message:"take result" , response:result});
   }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
   }
};


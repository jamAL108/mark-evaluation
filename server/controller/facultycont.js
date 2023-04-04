import Faculty from "../models/faculty.js";
import Notice from "../models/notice.js";
import Student from '../models/student.js';
import Subject from '../models/subject.js';
import Examination from "../models/examination.js";
import bcrypt from "bcryptjs"
import attendance from "../models/attendance.js";
import attenddates from "../models/attend_dates.js";
import examination from "../models/examination.js";
 export const Facultylogn = async(req,res)=>{
  const errors={passwordError:String , emailError:String , backenderror:String}
    try{
      const { email, password} = req.body;
      const data =   
      await Faculty.findOne({email})
      if(!data){
        errors.emailError="email doesnt exits";
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
      return res.status(404).send({error:errors})
    }
};

export const Updatepassword = async(req,res)=>{
  const errors ={passworderror:String , backenderror:String}
    try{
       const {email,newpassword , confirmpassword } = req.body;
       if(newpassword!==confirmpassword){
          errors.passworderror = "Your password and confirmation password do not match";
          return res.status(400).send({error:errors})
       }
       
      const data = await Faculty.findOne({ email });
       let hashedPassword;
       hashedPassword = await bcrypt.hash(newpassword, 10);
       data.password = hashedPassword;
       if(data.passwordupdated===false){
        data.passwordupdated=true;
     }
        await data.save();
           res.status(200).send({
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
         const data = await Notice.find({too:"teachers"})
         if(!data){
          errors.noticeerror = "no notice have being released in recent days"
          return res.status(404).send({error:errors})
         }else{
          return res.status(200).send({message:"notice fetched" , response:data})
         }
    }catch(err){
      errors.backenderror=err;
      return res.status(404).send({error:errors})
    }
};

export const Getstudent = async(req,res)=>{
  const errors={backenderror:String, studenterror:String}
  try{
      const data = req.body;
      const subjects = await Subject.findOne({depart:data.depart , subjectName:data.subject , year :data.year })
      const students = await Student.find({depart:data.depart , year:data.year , division:data.division})
      if(!students){
        errors.studenterror="no studetnyet registered to ur class "
        return res.status(404).send({error:errors})
      }else{
        const array=[];
          for(var i=0;i<students.length;i++){
              const temp = await Examination.findOne({
                exam:data.exam , student:students[i]._id , subjectCode:subjects.subjectCode , depart:data.depart
              })
              console.log(temp);
              if(!temp){
                  const create = await new Examination({
                    exam:data.exam , student:students[i]._id , depart:data.depart , subjectCode:subjects.subjectCode  
                  })
                  await create.save();
              }
              const tempdata = await Examination.findOne({
                exam:data.exam , student:students[i]._id , subjectCode:subjects.subjectCode
              })
              console.log(tempdata);
            const stud = {
                Rollno:students[i].Rollno , name:students[i].name , _id:students[i]._id , mark: tempdata.mark || -1 ,
                termmarks: tempdata.termwork || -1 , orals:tempdata.orals || -1
            }
            array.push(stud); 
          }
        return res.status(200).send({message:"student sended" , response:array});
      }
  }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors});
  }
}


export const Uploadmark = async(req,res)=>{
  const errors = {backenderror:String , uploaderror:String}
  try{
    const data = req.body;
    const subjectc =await Subject.findOne({subjectName:data.subject})
    const templates = await Examination.find({depart:data.depart , exam:data.exam , subjectCode:subjectc.subjectCode })
    
    if(!templates){
      errors.uploaderror="no test schema has been created yet server problem"
      return res.status(404).send({error:errors})
    }else{
      const array=[];
      const array1=[];

      //// for practical marks
      if(data.practical===true){
        for(var i=0;i<data.termmarks.length;i++){
          const studentid = data.termmarks[i]._id;
          const testtemp = await Examination.findOne({depart:data.depart , exam:data.exam , subjectCode:subjectc.subjectCode , student:studentid})
    const markofstudent = await Examination.findByIdAndUpdate({_id:testtemp._id } , {$set:{termwork:data.termmarks[i].value}});
        array1.push(markofstudent);
        }

    for(var j=0;j<data.oralmarks.length;j++){
      const studentid = data.oralmarks[j]._id;
      const testtemp = await Examination.findOne({depart:data.depart , exam:data.exam , subjectCode:subjectc.subjectCode , student:studentid})
const markofstudent = await Examination.findByIdAndUpdate({_id:testtemp._id } , {$set:{orals:data.oralmarks[j].value}});
     array.push(markofstudent);
     }


     ///// fro normal marks
    }else{
      for(var k=0;k<data.marks.length;k++){
         const studentid = data.marks[k]._id;
         const testtemp = await Examination.findOne({depart:data.depart , exam:data.exam , subjectCode:subjectc.subjectCode , student:studentid})
         console.log(testtemp._id);
   const markofstudent = await Examination.findByIdAndUpdate({_id:testtemp._id } , {$set:{mark:data.marks[k].value}});
    array.push(markofstudent);
    }
  }
    return res.status(200).send({message:"marks uploaded"  , response:array , anotherresponse:array1});
    }
  }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};


export const Studentfetch = async(req,res)=>{
  const errors = {backenderror:String , studenterror:String}
  try{
     const data = req.body;
     const students = await Student.find({depart:data.depart , year:data.year , division:data.division})
     if(!students){
       errors.studenterror="no student has been assigned in your class contact admin"
       return res.status(404).send({error:errors})
     }else{
      const subjet = await Subject.findOne({subjectName:data.subject});
      for(var i=0;i<students.length;i++){
      const attend = await attendance.findOne({student:students[i]._id , subject:subjet._id})
       if(!attend){
         const user = new attendance({
           student:students[i]._id,
           subject:subjet._id, 
           year:data.year,
           depart:data.depart,
           division:data.division,
           totalLecturesByFaculty:[
            {
              id:1,
              value:0
            },
            {
              id:2,
              value:0
            },
            {
              id:3,
              value:0
            },
            {
              id:4,
              value:0
            },{
              id:5,
              value:0
            },{
              id:6,
              value:0
            },
            {
              id:7,
              value:0
            },
            {
              id:8,
              value:0
            },
            {
              id:9,
              value:0
            },
            {
              id:10,
              value:0
            },
            {
              id:11,
              value:0
            },
            {
              id:12,
              value:0
            }
           ],
           lectureAttended:[
            {
              id:1,
              value:0
            },
            {
              id:2,
              value:0
            },
            {
              id:3,
              value:0
            },
            {
              id:4,
              value:0
            },{
              id:5,
              value:0
            },{
              id:6,
              value:0
            },
            {
              id:7,
              value:0
            },
            {
              id:8,
              value:0
            },
            {
              id:9,
              value:0
            },
            {
              id:10,
              value:0
            },
            {
              id:11,
              value:0
            },
            {
              id:12,
              value:0
            }
           ]
         })
         await user.save();
       }
      }
      return res.status(200).send({message:"student sended" , response:students})
     }
  }catch(err){
    errors.backenderror=err;
    return res.status(404).send({error:errors})
  }
};


export const Markattendance = async(req,res)=>{
  const errors = {backenderror:String , uploaderror:String}
  try{
     const data = req.body;
     const subjet = await Subject.findOne({subjectName:data.subj.subject});
      const lecturecount = await attendance.find({depart:data.subj.depart , year:data.subj.year , division:data.subj.division , subject:subjet._id })
      const date = new Date();
      const month = date.getMonth() +1;
      for(var i=0;i<lecturecount.length;i++){
        const totallec = lecturecount[i].totalLecturesByFaculty[month-1].value +1 ;
         await attendance.updateOne({_id:lecturecount[i]._id , "totalLecturesByFaculty.id":month} , {$set: {"totalLecturesByFaculty.$.value":totallec}});
      }
      let array=[];
      const da = new Date();
      const mont = da.getMonth() +1;
      for(var j=0;j<data.checkedValue.length;j++){
      const atte = await attendance.findOne({student:data.checkedValue[j] , subject:subjet._id})
      const lecattend = atte.lectureAttended[mont-1].value +1 ;
     await  attendance.updateOne({_id:atte._id , "lectureAttended.id":mont} , {$set: {"lectureAttended.$.value":lecattend}});
     console.log(lecattend);
      const date = new Date();
      const month = date.getMonth() +1;
      const neew = new attenddates({
        attendance:atte._id,
        month: month,
        date:data.value.date,
        time:data.value.time
      })
      await neew.save();
      array.push(neew);
      console.log(await attendance.findOne({_id:atte._id}));
    }

    return res.status(200).send({message:"attendance marked" ,response:array})
     }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};








import Faculty from "../models/faculty.js";
import Notice from "../models/notice.js";
import Student from '../models/student.js';
import Subject from '../models/subject.js';
import Examination from "../models/examination.js";
import bcrypt from "bcryptjs"
import attendance from "../models/attendance.js";
import attenddates from "../models/attend_dates.js";
import examination from "../models/examination.js";
import defaulter from "../models/defaulter.js";
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
         const date = new Date();
         const month = date.getMonth() +1;
         const neew = new attenddates({
           attendance:lecturecount[i]._id,
           month: month,
           date:data.value.date,
           time:data.value.time,
           status:"ABSENT"
         })
         await neew.save();
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
let temp1 = await attenddates.findOne({attendance:atte._id ,month: month,
        date:data.value.date,
        time:data.value.time});
        temp1.status="PRESENT";
        await temp1.save();
      array.push(temp1);
      console.log(await attendance.findOne({_id:atte._id}));
    }

    return res.status(200).send({message:"attendance marked" ,response:array})
     }catch(err){
    errors.backenderror=err;
    console.log(err);
    return res.status(404).send({error:errors})
  }
};


export const Getdefaulter = async(req,res)=>{
     const errors = {backenderror:String , defaultererror:String}
     try{
        const data = req.body;
        console.log(data);
        let cc={
          sort:1,
          overall:[],
          monthly:[]
        };
        let other=[];
        if(data.class.length!==0){
            for(var i=0;i<data.class.length;i++){
                if(data.class[i].sort===1){
                  const subjects = await Subject.find({depart:data.depart,year:data.class[i].year})
                   const overal = await defaulter.find({depart:data.depart , division:data.class[i].division , year:data.class[i].year ,status:true })
                   for(var a=0;a<overal.length;a++){
                    const month = overal[a].month;
                    const moth={
                      month:month,
                      student:[]
                    }
                    for(var q =0;q<overal[a].defaulter.length;q++){
                      const stud={
                        student:overal[a].defaulter[q].name,
                        Rollno:overal[a].defaulter[q].Rollno,
                        subjects:[],
                        overall:0
                      }
                      let overrrrr=0;
                         for(var z=0;z<subjects.length;z++){
                            const studdata = await attendance.findOne({student:overal[a].defaulter[q]._id , subject:subjects[z]._id})
                             const percet =  (studdata.lectureAttended[month].value/studdata.totalLecturesByFaculty[month].value)*100
                              const subj1={
                                subject:subjects[z]._id,
                                percent:percet
                              }
                              stud.subjects.push(subj1);
                              overrrrr+=percet;
                           }
                           stud.overall=overrrrr/subjects.length;
                           moth.student.push(stud);
                       }
                       cc.monthly.push(moth);
                   }
                   const students = await Student.find({depart:data.depart , division:data.class[i].division , year:data.class[i].year})
                   for(var w =0;w<students.length;w++){
                        let ovvver=0;
                        let studd=[];
                           for(var v=0;v<subjects.length;v++){
                              const stud = await attendance.findOne({student:students[w]._id , subject:subjects[v]._id});
                              let totallec=0;
                              let lecattend=0;
                              for(var m=0;m<12;m++){
                                 totallec+=stud.totalLecturesByFaculty[m].value;
                                 lecattend+=stud.lectureAttended[m].value;
                              }
                              let percent = (lecattend/totallec)*100;
                              ovvver+=percent;
                              const subjj = {
                                subject:subjects[v]._id,
                                percent:percent
                              }
                              studd.push(subjj);
                           }
                           const per = ovvver/subjects.length;
                           if(per<75){
                            const obj={
                              student:students[w].name,
                              Rollno:students[w].Rollno,
                              overall:ovvver/subjects.length,
                              subjects:studd
                            }
                            cc.overall.push(obj);
                           }
                   }
                }

















                if(data.class[i].sort===0){
                const subbbj = await Subject.findOne({subjectName:data.class[i].subject})
                const ownsubjstud = await attendance.find({subject:subbbj._id , division:data.class[i].division , year:data.class[i].year})
                  let clas ={
                      sort:0,
                      year:data.class[i].year,
                      division:data.class[i].division,
                      overall:[],
                      monthly:[]
                  }
                let monthly=[];
                for(var j=0;j<12;j++){
                  let month={
                    month:j+1,
                    students:[]
                  };
                   for(var k=0;k<ownsubjstud.length;k++){
                   const totallec=ownsubjstud[k].totalLecturesByFaculty[j].value;
                    const lecattend=ownsubjstud[k].lectureAttended[j].value;
                    const perc = (lecattend/totallec)*100;
                    const sttttud = await Student.findOne({_id:ownsubjstud[k].student})
                    if(perc<data.percent){
                        const obj = {
                          student:sttttud.name,
                          ROllno:sttttud.Rollno,
                          percentage:perc
                         }
                         month.students.push(obj);
                    }
                  }
                monthly.push(month);
                }
                clas.monthly=monthly;


                let overaaal=[];

                for(var q=0;q<ownsubjstud.length;q++){
                  let lecattend;
                  let totallec;
                for(var p=0;p<12;p++){
                    lecattend+=ownsubjstud[q].totalLecturesByFaculty[p].value;
                    totallec+=ownsubjstud[q].lectureAttended[p].value;
                }
                let percen = (lecattend/totallec)*100;
                if(percen<data.percent){
                  const sttttud = await Student.findOne({_id:ownsubjstud[q].student})
                  const obj = {
                    student:sttttud.name,
                    Rollno:sttttud.Rollno,
                    percentage:final
                   }
                   overaaal.push(obj);
                }
              }
              clas.overall=overaaal;
              other.push(clas);
          }
        }
        }
        console.log(other);
        return res.status(200).send({cc:cc,other:other})
     }catch(err){
      errors.backenderror=err;
      console.log(err);
      return res.status(404).send({error:errors})
     }
}

export const Getsubject = async (req,res)=>{
  const errors ={backenderror:String, subjecterror:String}
  try{
       const {depart,year} = req.body;
       console.log(depart);
       const subjects = await Subject.find({depart,year})
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







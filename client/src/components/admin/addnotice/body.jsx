import React , {useEffect, useState} from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useDispatch , useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addnotice  } from '../../../redux/action/adminaction';
import { CREATE_NOTICE, CREATE_NOTICE_ERROR } from '../../../redux/actiontype';
function Addnotice(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);
  const err = useSelector((state)=>state.admin.createnoticeerror);
    const [value , setValue]=useState({
        date:"",
        topic:"",
        too:"",
        from:"",
        content:""
    })
    const [error , seterror]=useState({});

    useEffect(()=>{
      console.log(store.admin.createnoticeerror)
      seterror(store.admin.createnoticeerror);
    },[store.admin.createnoticeerror])

    useEffect(()=>{
      if(store.admin.noticeadded){
      setValue({
        date:"",
        topic:"",
        To:"",
        from:"",
        content:""
       })
       dispatch({type:CREATE_NOTICE , payload:false})
       dispatch({type:CREATE_NOTICE_ERROR , payload:{}})
      }
    },[store.admin.noticeadded])


    const submit = async(e)=>{
      e.preventDefault();
      console.log("hello");
        dispatch(addnotice(value,navigate));
    }

    const clear = async(e)=>{
       setValue({
        date:"",
        topic:"",
        To:"",
        from:"",
        content:""
       })
       seterror({});
       dispatch({type:CREATE_NOTICE_ERROR , payload:{}})
    }


    return(
        <div className="addbody" style={{background:"white"}}> 
        <div className="header">
            create notice
        </div>
        <form method="POST">
         <div className="form-group">
                      <h1 className="DOB">date:</h1>
                      <input
                        required
                        placeholder="DD/MM/YYYY"
                        className="inpit"
                        type="date"
                        value={value.date}
                        onChange={(e) =>
                          setValue({ ...value, date: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group">
                      <h1 className="topic">Topic :</h1>
                      <input type="text" name="topic" placeholder="Enter topic" id="email" autoComplete='off' className="form-control" value={value.topic} onChange={(e)=>{
          setValue( {...value , topic:e.target.value})
         }} />
                    </div>
     
         <div className="form-group">
         <h1 className="departmnet">To :</h1>
                      <Select
                        required
                        displayEmpty
                        sx={{ height: 36 }}
                        inputProps={{ "aria-label": "Without label" }}
                        value={value.To}
                        onChange={(e) =>
                          setValue({ ...value, To: e.target.value })
                        }>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Students">students</MenuItem>
                        <MenuItem value="Teacher">teachers</MenuItem>
                        <MenuItem value="All">all</MenuItem>
                      </Select>
         </div>

         <div className="form-group">
         <h1 className="h1s">
                    from :
                  </h1>
         <input type="text" name="from" placeholder="enter here" id="from" autoComplete='off' className="form-control" value={value.from} onChange={(e)=>{
          setValue( {...value , from:e.target.value})
         }} />
         </div>       
        
         <div className="form-group">
         <h1 className="h1s">
                    Content :
                  </h1>
         <textarea
                    rows={10}
                    cols={40}
                    required
                    placeholder="Content...."
                    className="content"
                    value={value.content}
                    onChange={(e) =>
                      setValue({ ...value, content: e.target.value })
                    }
                  />
          </div>  
         <span>{error.Backenderror}</span>             
         <div className="form-group">
         <button type="submit" onClick={submit}>submit</button>
        </div>
        <div className="form-group">
         <button type="submit" onClick={clear}>clear
        </button>
        </div>
        </form>
        </div>
    );
}

export default Addnotice;
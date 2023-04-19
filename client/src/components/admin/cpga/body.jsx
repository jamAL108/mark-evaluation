import React from 'react'

const Body = () => {

   const submit = async(e)=>{
     e.preventDefault();
     dispatchEvent(generateresult());
   }


  return (
    <div className="result">
      <div className="heeead">
      <h1>Generate Results ofr the ongoing semester</h1>
      </div>
      <div className="rules">
        <h3>Make sure every faculty have entered IA/MIDSEM/PRACTICAL marks and CREDITS properly for every Students</h3>
        <h3>ZERO mark will be considered for the students whose marks are not entered by thier respective faculty</h3>
        <h3>0.5 points will be given based on attendance in term work category</h3>
      </div>
      <button onClick={submit} >Generate Results</button>
    </div>
  )
}

export default Body
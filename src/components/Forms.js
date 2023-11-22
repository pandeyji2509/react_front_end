import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "./forms.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const Forms = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const [que,setque]=useState(false);
  const onSubmit = (data) => {
    var datas = { Total_Marks: data.totalMarks, Difficulty: { Easy: data.easyMarks, Moderate: data.moderateMarks, Hard: data.hardMarks } };
    console.log(JSON.stringify(datas));
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch("http://localhost:5000/question_paper", {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: headers
    }).then((res) => res.json())
      .then((dat) => {
        if(dat.error){
          alert(dat.error);
          navigate("/");
          return;
        }
        else{
          console.log(dat)
        setque(dat);
        }
        
      })
  }
  useEffect(()=>{
    console.log(que);
  },[que]);

  return (
    <div className={`${!que?(""):("back")}`}>
    {!que?(""):(<div className='qp'><h1>Question Paper</h1></div>)}
    {!que?(
    <div className='form center'>
      <h1>Prepare Question Paper</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label>Total Marks</label>
        <div className="inputbox">
          <input
            type='text'
            name='totalMarks'
            placeholder='Total Marks'
            // onChange={handlemarks}
            {...register("totalMarks")}
          />
        </div>
        <label>Percentage of Easy questions</label>
        <div className="inputbox">
          <input
            type='text'
            name='easyMarks'
            placeholder='Percentage of Easy Questions'
            // onChange={easymarks}
            {...register("easyMarks", { required: true })}
          />
        </div>
        <label>Percentage of Moderate Questions</label>
        <div className="inputbox">
          <input
            type='text'
            name='moderateMarks'
            placeholder='Percentage of Moderate Questions'
            // onChange={moderateMarks}
            {...register("moderateMarks", { required: true })}
          />
        </div>
        <label>Percentage of Hard Questions</label>
        <div className="inputbox">
          <input
            type='number'
            name='hardMarks'
            placeholder='Percentage of Hard Questions'
            // onChange={hardmarks}
            {...register("hardMarks", { required: true })}
          />
        </div>
        <div className="inputbox">
        <button className='button-9' type="submit">Prepare Question Paper</button>
        </div>
        <div>Add Question
      <Link as={Link} to="/question"><button className='button-10'>+</button></Link>
    </div>
      </form>
    </div>):(
      que.map((q)=>{
        return(
          <div className='ques'>
            <h1 className='head'>{q.Topic}</h1>
            <p className='para'>{q.question}</p>
            <p className='para'>Marks: {q.Marks}</p>
          </div>
        )
      })
    )} 
    {que?(<button className='button-9' onClick={()=>{setque(false)}}>Return</button>):("")}
    </div> 
  )
}
export default Forms;
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "./forms.css";

import { BrowserRouter as Router, Routes, Route, Link,Navigate, useNavigate } from "react-router-dom";

const Question = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [que,setque]=useState(false);
  const onSubmit = (data) => {
    var datas = { Questions: data.Questions, Subject:data.Subject,Topic:data.Topic,Difficulty:data.Difficulty,Marks:data.Marks };
    console.log(JSON.stringify(datas));
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    fetch("http://localhost:5000/add_questions", {
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
      }).catch((e)=>{
         if(e.error){
          alert("");
          navigate("/")
        }
        setque(null);
        console.log(e);
      })
  }
  useEffect(()=>{
    console.log(que);
  },[que]);
  const [es,setes]=useState("");
  const handleChange=(event)=>{
    console.log(event);
    setes(event.target.value);
  }

  return (
    <div className={`${!que?(""):("back")}`}>
    {!que?(
    <div className='form center'>
    <Link to={"/"}><button className='button-12'>return</button></Link>
      <h1>Add Question</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label>Write Question</label>
        <div className="inputbox">    
          <input
            type='text'
            name='Questions'
            placeholder='Write Question'
            // onChange={handlemarks}
            {...register("Questions", { required: true })}
          />
        </div>
        <label>Write Subject</label>
        <div className="inputbox">
          <input
            type='text'
            name='Subject'
            placeholder='Write Subject'
            // onChange={easymarks}
            {...register("Subject", { required: true })}
          />
        </div>
        <label className='lab'>Topic of The Question</label>
        <div className="inputbox">
          <input
            type='text'
            name='Topic'
            placeholder='Topic of the Question'
            // onChange={moderateMarks}
            {...register("Topic", { required: true })}
          />
        </div>
        <label>Marks to The Question</label>
        <div className="inputbox">
          <input
            type='number'
            name='Marks'
            placeholder='Marks to The Question'
            onChange={handleChange}
            {...register("Marks", { required: true })}
          />
        </div>
        <div className="inputbox">
        <button className='button-9' type="submit">Add question</button>
        </div>
      </form>
    </div>):(
    <div>
      <h1>Successfully added Question</h1>
      <Link as={Link} to="/"><button className='button-9'>Prepare question paper</button></Link>
    </div>
    )} 
    </div> 
  )
}
export default Question;
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Axios from 'axios';
  
const CreateEvent = () => {

  const url = "http://127.0.0.1:8000/api/events/"; 

  const navigate = useNavigate();

  const location = useLocation();

  const [data, setData] = useState({
    name: "",
    loc: "",
    date: ""
  })

  // stores onchange data from input
  function handle(e){
    const newdata = {...data};
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  // post and put method to create new event
  function create(e, requestType){
    e.preventDefault();
    switch(requestType){
      case 'Create':
        Axios.post(url,{
          Name: data.name,
          Location:data.loc,
          Date: data.date,       
      }).then(res => alert("Event added!"))
        .catch(error => console.log(error.response))
      
      case 'Edit':
        Axios.put(`http://127.0.0.1:8000/api/events/${location.state.item.id}/`,{
          Name: data.name,
          Location:data.loc,
          Date: data.date,       
      }).then(res => alert("Event Updated!"))
        .catch(error => console.log(error.response))
    }
  }

  // navigates to event list page
  function goBack (){
    navigate("/");
  }

  return (
    <div className="container m-4 card p-4">
      <h5> Events</h5>
      <p> <span>{location.state.text.text1}</span> <span style={{ color: 'blue' }} onClick={goBack}> Back</span></p>
      <div className="m-4">
        <form onSubmit={(e)=> create(e, location.state.text.text2)}>
            <input className="m-4" onChange={(e)=> handle(e)} id = "name" value = {data.name} placeholder="name"  type='text'></input>
            <label  className="m-1" htmlFor="loc">Location </label>
            <select id="loc" name="loc"  onChange={(e)=> handle(e)}>
            <option value="Bangladesh">Bangladesh</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Bhutan">Bhutan</option>
            </select>           
            <input className="m-4" onChange={(e)=> handle(e)} id = "date" value = {data.date} placeholder="date" type="datetime-local"></input>
            <button className="btn btn-primary">{location.state.text.text2}</button>
        </form>
      </div>
    </div>
  );
};
  
export default CreateEvent;
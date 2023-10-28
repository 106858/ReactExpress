import logo from './logo.svg';
import './App.css';
import { useState,useEffect} from 'react';
import axios from 'axios';
 
function App() {
  const[datas,setdatas]=useState([]);
  const[isTrue,setisTrue]=useState(false);
  const[username,setusername]=useState("");
  const[password,setpassword]=useState("");
  const[email,setemail]=useState(""); 
 
  const updateUL=()=>{
    fetch('http://localhost:4000/getAllUser').then(response => response.json()).then(data=>{ setdatas(data); console.log(data); });
    // var id=document.getElementById('ul');
    // if(isTrue ==  false){
    // for(var i=0;i<datas.length;i++){
    //   console.log(datas.length);
    //   var li=document.createElement('li');
    //   li.innerHTML=datas[i].UserName + " " + datas[i].Password + " " + datas[i].emailId;
    //  // var hr=document.getElementById('hr');
    //   id.appendChild(li);  
    //   isTrue=true;
    // }
 
  }
  const addUser=(event)=>{
    event.preventDefault();
     axios.post('http://localhost:4000/insertUser',{adduser:username,addpassword:password,addemail:email}).then(response=>{
        console.log(response);
     })
     setusername("");
     setpassword("");
     setemail("");
     }
     const updateUser=(event)=>{
      axios.put("http://localhost:4000/updateUser",{updateuser:username,updatepassword:password,updatemail:email}).then(response=>{
       console.log(response);})
    }
 
     const deleteUser=(event)=>{
       axios.delete("http://localhost:4000/deleteUser",{params:{deleteusingid:username}}).then(response=>{
        console.log(response);})
     }
 
 
 
  return (
    <div className="App">
      <form>
        <b >Username</b><input type="text" placeholder="Enter your name" value={username} onChange={(e)=>{setusername(e.target.value)}} /><br/>
        <b>Password</b><input type="text" placeholder="Enter the password" value={password} onChange={(e)=>{setpassword(e.target.value)}}/><br/>
        <b>Email</b><input type="text" placeholder="Enter the email" value={email} onChange={(e)=>{setemail(e.target.value)}} /><br/>
        <input type="button" value="Add"  onClick={addUser}/>&nbsp;&nbsp;
        <input type="button" value="Delete" onClick={deleteUser}/>&nbsp;&nbsp;
        <input type="button" value="Update" onClick={updateUser}/>&nbsp;&nbsp;
        <input type="button" onClick={updateUL} value="GetAllUser"/>
 
      <ul  class="ul1">
        {
          datas.map((data)=>(
          <li>{data.userid} {data.password} {data.emailid} </li>
        ))
        }
      </ul>
 
      </form>
     
    </div>
  );
 
}
 
export default App;
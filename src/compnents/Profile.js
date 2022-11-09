import React,{useEffect,useState} from 'react'
import Username_image from './Profile/Username_image'
import Language from './Profile/Language'
import BaseUrl from '../config/BaseUrl';
import Bio from './Profile/Bio'
import Skill from './Profile/Skill'
import Education from './Profile/Education'
import Experience_Certificate from './Profile/Experience_Certificate'
import {useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Navbar from '../page/Navbar';

const Profile = () => {
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate();
  const [getData,setGetData]=React.useState()

  const ProfileSubmit =()=> {
    axios({
      method: 'GET',
      url: `${BaseUrl.url}/getProfile`,
      headers:{
        'Authorization':`Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((res)=>{
      console.log(res.data)
      setGetData(res.data.candidata);
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }
  var jwtoken = window.localStorage.getItem('token');
  if (jwtoken) {
  var decoded = jwt_decode(jwtoken);
  if (decoded.exp * 1000 < Date.now()) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      navigate('/login')
  }}
  React.useEffect(()=>{
    ProfileSubmit();
  },[window.localStorage.getItem('token'),])
  return (
    <>
    {!token?navigate('/login'):
    <div className="bg-blue-100">
      <Navbar />
    {/* <!-----------------------HEADER-->
    
    <!--------------------------profile--> */}
    <Username_image data={getData}/>
  <div>
    <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
    <div className=" grid grid-cols-3 gap-4 border-r">
    <Language data={getData?getData.language:null} ProfileSubmit={ProfileSubmit}/>
    <Bio data={getData?getData.bio:null}/>
    </div>
      <br />
      {/*------------------------------------------------------------ROW1*/}
      {/*------------------------------------------------------------ROW2*/}
      <div className=" grid grid-cols-3 gap-4 border-r">
      <Skill data={getData?getData.skills:null} ProfileSubmit={ProfileSubmit}/>
      <Education data={getData?getData.education:null} ProfileSubmit={ProfileSubmit}/>
      </div>
      <hr />
      <br />
      <br />
    </div>
      {/*------------------------------------------------------------ROW2*/}
      {/*------------------------------------------------------------ROW3*/}
      <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded "> 
      <Experience_Certificate data={getData?getData.experience:null} ProfileSubmit={ProfileSubmit}/>
      </div>
  </div>
    {/* <!-----------------------------------Experience--> */}
  </div>
  }   
    </>
  )
}
export default Profile

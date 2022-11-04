import React,{useEffect,useState} from 'react'
import Username_image from './Profile/Username_image'
import Language from './Profile/Language'
import { toast, ToastContainer } from 'react-toastify';
import BaseUrl from '../config/BaseUrl';
import Bio from './Profile/Bio'
import Skill from './Profile/Skill'
import Education from './Profile/Education'
import Experience_Certificate from './Profile/Experience_Certificate'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Profile = () => {
  const token = window.localStorage.getItem('token')
  const navigate = useNavigate();
  const [getData,setGetData]=React.useState()
  const [btnDisable,setBtnDisable]=useState(false)

  const LogoutHandler=()=>{
    setBtnDisable(true)
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    toast.error('logout SuccessFully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:'colored'
      });
      setTimeout(() => {
          navigate('/alluser')
      }, 2000);
  }
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
  React.useEffect(()=>{
    ProfileSubmit();
  },[window.localStorage.getItem('token')])

  
  
 

var jwtoken = window.localStorage.getItem('token');
  if (jwtoken) {
  var decoded = jwt_decode(jwtoken);
  if (decoded.exp * 1000 < Date.now()) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('id')
      navigate('/login')
  }}
  return (
    <>
    {!token?navigate('/login'):
    <div className="bg-blue-100">
    {/* <!-----------------------HEADER--> */}
    <nav className="bg-white border-b border-slate-300">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
          <div className="flex space-x-4">
            <button type='button' disabled={btnDisable} onClick={LogoutHandler} className="text-black hover:bg-gray-200  px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
    {/* <!-----------------------HEADER-->
    <!--------------------------profile--> */}
    <Username_image data={getData}/>
  <div>
    <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded ">
    <div className=" grid grid-cols-3 gap-4 border-r">
    <Language data={getData?getData.language:null}/>
    <Bio data={getData?getData.bio:null}/>
    </div>
      <br />
      {/*------------------------------------------------------------ROW1*/}
      {/*------------------------------------------------------------ROW2*/}
      <div className=" grid grid-cols-3 gap-4 border-r">
      <Skill data={getData?getData.skills:null}/>
      <Education data={getData?getData.education:null}/>
      </div>
      <hr />
      <br />
      <br />
    </div>
      {/*------------------------------------------------------------ROW2*/}
      {/*------------------------------------------------------------ROW3*/}
      <div className="container w-11/15 mx-auto p-4 mt-4 border border-slate-300 bg-white rounded "> 
      <Experience_Certificate data={getData?getData.experience:null} />
      </div>
  </div>
    {/* <!-----------------------------------Experience--> */}
  </div>
  }   
    </>
  )
}
export default Profile

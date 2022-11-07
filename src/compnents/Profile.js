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
    {/* <!-----------------------HEADER--> */}
    {/* <nav className="bg-white border-b border-slate-300">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
          <div className="flex space-x-4">
            <button type='button' disabled={btnDisable} onClick={LogoutHandler} className="text-black hover:bg-gray-200  px-3 py-2 rounded-md text-sm font-medium">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav> */}
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
  <div className="container flex flex-wrap justify-between items-center mx-auto">
    <a href className="flex items-center">
      <span className="self-center text-xl font-semibold whitespace-nowrap text-white"></span>
    </a>
    <div className="flex items-center md:order-2">
      <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt />
      </button>
      {/* Dropdown menu */}
      <div className="hidden z-50 my-4 text-sm list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown" data-popper-reference-hidden data-popper-escaped data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate(0px, 410px)'}}>
        <ul className="py-1" aria-labelledby="user-menu-button">
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Admin
              API</a>
          </li>
          <li>
            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
          </li>
        </ul>
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

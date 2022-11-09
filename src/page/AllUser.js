import React, { useState,useEffect} from 'react';
import axios from 'axios';
import BaseUrl from '../config/BaseUrl';
import { Image, Breathing } from 'react-shimmer'
import { useNavigate,NavLink } from 'react-router-dom';

const AllUser = () => {
    const navigate =useNavigate()
const[allUsers,setAllUsers]=useState()
useEffect(()=>{
    axios.get(`${BaseUrl.url}/getAlluser`,
    ).then((res)=>{
    setAllUsers(res.data.candidate)
    }).catch((err)=>{
       console.log(err.message) 
    })
},[])
console.log(allUsers,"allUsers")
const GetAllUsers=(id)=>{
 navigate(`/getuser/${id}`)
} 
  return (
    <>
     <nav className="bg-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
            <div className="flex space-x-4">  
            <NavLink to="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</NavLink>
            </div>
        </div>
        </div>
      </div>
     </nav>
     <div className="bg-blue-100">
        <div className="container  w-11/15 mx-auto px-4  mt-4 border border-slate-300 bg-white rounded ">
            <div className="relative flex flex-col flex-auto min-w-0 mt-4 p-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border mb-4 draggable" draggable="true">
                <div className="h-full mb-4">
                    <h5 className="mb-1 text-xl font-semibold">User's</h5>
                </div>
                <div className="grid gap-2 mb-6 md:grid-cols-4">
                {!allUsers?<Breathing width={1300} height={550} />:
                allUsers.map((data)=>{
                return(
                
                    <div className="p-3 gap-4  bg-white rounded-xl shadow-lg flex items-center  border border-gray-300">
                        <div onClick={()=>GetAllUsers(data._id)} className>
                           <Image src={data.avatar} fallback={<Breathing width={800} height={600} />} />
                            {/* <img className="rounded " src={data.avatar} alt /> */}
                            <div className="text-lg font-medium text-black text-center mt-3">{data.name}</div>          
                        </div>
                    </div>
                )})}
               </div>
            </div>
        </div>
    </div>
 </>
  )
}

export default AllUser;

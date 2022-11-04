import React, { useState,useEffect } from 'react' 
import {Field, Form, Formik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import LoadingSpinner from '../../../more/LoadingSpinner';
import BaseUrl from '../../../config/BaseUrl';
import axios from 'axios';
import '../../../App.css';
import * as yup from 'yup';
import { NavLink,useNavigate } from 'react-router-dom';
import MetaData from '../../../more/MetaData';


const validationSchema = yup.object({
      email: yup
        .string('Enter your email')
        .required('Email is required')
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Invalid Email Format"),
      password: yup
        .string('Enter your password')
        .required('Password is required'),
    });
const Login = () =>{
  const navigate=useNavigate()
  const [btndisabled,setBtnDisable]=useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false)
  const eye_Password=()=>{
    if(!showPassword){
      setShowPassword(true)
    }else{
      setShowPassword(false)
    }
  }
  useEffect(() => {
    let login = localStorage.getItem('token');
    if(login){
      navigate(`/profile/${window.localStorage.getItem('id')}`)
    }
  })
return (
  <>
  <MetaData title='Login'/>
    {/* ---------------------HEADER */}
  <nav className="bg-black">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
          <div className="flex space-x-4">  
          <NavLink to="/signup" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Signup</NavLink>
        </div>
       </div>
      </div>
    </div>
  </nav>
   {/* ---------------------HEADER */}
   {/* ------------------------------------registeration form */}
  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
    </div>
      <Formik
      initialValues={{ email:'',  password:'' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios({
          method: 'POST',
          url: `${BaseUrl.url}/login`,
          data:{
            email:values.email,
            password:values.password,
          }
        }).then((res)=>{
            
            setTimeout(() => {
            navigate(`/profile/${res.data._Id}`)
          },3000);
          localStorage.setItem('token',res.data.token,true)
          localStorage.setItem('id',res.data._Id)
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'colored'
            });
        })
        .catch((err)=>{
          setIsLoading(true)
            setBtnDisable(true)
            setTimeout(() => {
              setIsLoading(false)
              setBtnDisable(false)
            },3000);
          toast.error(err.response.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'colored'
            });
        })
      }}
      >
      {({ errors, touched }) => (
      <Form className="mt-8 space-y-4 ">
      <div className="mt-8 space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <Field id="email-address" name="email" type="email" style={{textTransform:'lowercase'}} autoComplete="email" 
          className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.email ? " " : "border-red-500"} email `} 
           placeholder="Email address" />
          {errors.email && touched.email ? (
            <div className='text-red-700 text-xs font-bold'>{errors.email}</div>
            ) : null}
        </div>
        <div className='password-eye'>
          <label htmlFor="password" className="sr-only">Password</label>
          <Field id="password" name="password"  type={!showPassword ? "password" : "text"}  autoComplete="current-password" className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${!errors.password ? " " : "border-red-500"}`} 
           placeholder="Password" />
          <span className="flex justify-end">{!showPassword ? <i onClick={eye_Password} className="fa-sharp fa-solid fa-eye-slash" ></i> : <i onClick={eye_Password} className="fa-solid fa-eye"></i>}</span>
          {errors.password && touched.password ? (
            <div className='text-red-700 text-xs font-bold'>{errors.password}</div>
            ) : null}
        </div>
      </div>
      <div className="flex justify-end">
          <div className="text-sm">
          <a href="#" className="font-medium text-black hover:text-gray-600">Forgot your password?</a>
        </div>
      </div>
      <div>
        <button type="submit" disabled={btndisabled} className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-black-500 focus:ring-offset-2">
         {isLoading ? <LoadingSpinner /> : <> Login </>}
        </button>
        <ToastContainer />
      </div>
      <div className="flex items-center justify-center">
        <div className="text-sm">
          Don't have account?&nbsp;<NavLink to="/signup" className="font-medium text-black hover:text-gray-600">Register</NavLink>
        </div>
      </div>
    </Form>
     )}
    </Formik>
  </div>
</div>
</>
)
}
export default Login
